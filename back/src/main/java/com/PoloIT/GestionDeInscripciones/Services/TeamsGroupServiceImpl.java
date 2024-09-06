package com.PoloIT.GestionDeInscripciones.Services;

import com.PoloIT.GestionDeInscripciones.Config.ExecptionControll.ResponseException;
import com.PoloIT.GestionDeInscripciones.DTO.TeamFilter;
import com.PoloIT.GestionDeInscripciones.DTO.TeamGroupFilterDTO;
import com.PoloIT.GestionDeInscripciones.Entity.Event;
import com.PoloIT.GestionDeInscripciones.Entity.Mentor;
import com.PoloIT.GestionDeInscripciones.Entity.Student;
import com.PoloIT.GestionDeInscripciones.Entity.Team;
import com.PoloIT.GestionDeInscripciones.Repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@Slf4j
@RequiredArgsConstructor
public class TeamsGroupServiceImpl {
    private final PasswordEncoder encoder;
    private final TeamGroupRepository teamGroupRepository;
    private final EventRepository eventRepository;
    private final StudentRepository studentRepository;
    private final MentorRepository mentorRepository;

    private final TeamRepository teamRepository;

    public void save(TeamGroupFilterDTO filter, Long id) {
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new ResponseException("404", "ID NOT FOUND EVENT", HttpStatus.NOT_FOUND));

        //!Carga register
//        setRegister(event);

        if (event.getTeamGroup().getTeams() != null) {
            teamRepository.deleteAll(event.getTeamGroup().getTeams());
        }

        Set<Team> teams = generateTeams(event, filter);
        teamRepository.saveAll(teams);
    }

    private Map<String, List<Student>> getStudentDontTeam(Long id) {
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new ResponseException("404", "ID NOT FOUND EVENT", HttpStatus.NOT_FOUND));

        List<Student> studentsNotInTeams = event.getRegistration().getStudents().stream()
                .filter(student -> event.getTeamGroup().getTeams().stream()
                        .noneMatch(team -> team.getStudents().contains(student)))
                .toList();

        return Map.of("Student ", studentsNotInTeams);
    }

    private void editTeam(Team team, Long id) {
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new ResponseException("404", "ID NOT FOUND EVENT", HttpStatus.NOT_FOUND));

        if (teamExists(event, team)) {
            System.out.println("Error: Team not found in event");
        }
        teamRepository.save(team);
    }

    private void deleteTeam(Team team, Long id) {
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new ResponseException("404", "ID NOT FOUND EVENT", HttpStatus.NOT_FOUND));

        if (teamExists(event, team)) {
            System.out.println("Error: Team not found in event");
        }

        teamRepository.delete(team);
    }


    private Set<Team> generateTeams(Event event, TeamGroupFilterDTO filter) {
        Set<Team> teams = new HashSet<>();

        List<TeamFilter> studentFilter = filter.studentFilter();
        List<TeamFilter> mentorFilter = filter.mentorFilter();

        List<Student> studentList = event.getRegistration().getStudents().stream()
                .sorted(Comparator.comparing(Student::getId))
                .toList();

        List<Mentor> mentorList = event.getRegistration().getMentors().stream()
                .sorted(Comparator.comparing(Mentor::getId))
                .toList();


        Map<String, Integer> indexFiltersStudent = new HashMap<>();
        Map<String, Integer> indexFiltersMentors = new HashMap<>();

        int groups = Optional.of(filter.groups()).orElse(studentList.size());

        for (int i = 0; i < groups; i++) {
            Team team = new Team();
            team.setStudents(new HashSet<>());
            team.setMentors(new HashSet<>());

            for (TeamFilter filter1 : studentFilter) {
                int index = indexFiltersStudent.getOrDefault(filter1.rol(), 0);

                Set<Student> list = new HashSet<>();


                for (int k = index; k < studentList.size() && list.size() < filter1.quantity(); k++) {
                    Student student = studentList.get(k);

                    // busca coincidencias y no es preciso con el rol tal cual.
                    // if (student.getRol().stream().anyMatch(s -> s.contains(filter1.rol()))) {

                    if (student.getRol().stream().anyMatch(s -> s.equalsIgnoreCase(filter1.rol())) && !filter1.technologies().isEmpty()) {
                        list.add(student);
                        indexFiltersStudent.put(filter1.rol(), k + 1);
                        continue;
                    }

                    if (student.getRol().stream().anyMatch(s -> s.equalsIgnoreCase(filter1.rol())) && filter1.technologies().isEmpty()) {
                        list.add(student);
                        indexFiltersStudent.put(filter1.rol(), k + 1);
                    }

                }


                team.getStudents().addAll(list);
            }


            for (TeamFilter filter1 : mentorFilter) {

                int index = indexFiltersMentors.getOrDefault(filter1.rol(), 0);
                int limitMentor = filter1.quantity();
                int mentorsStock = mentorList.stream().filter(value -> value.getRol().stream().anyMatch(s -> s.equalsIgnoreCase(filter1.rol()))).toList().size();

                Set<Mentor> list = new HashSet<>();

                boolean loopbreak = mentorsStock < filter1.quantity();


                // puede que la cantidad solicitada del rol del mentor no se cumpla. se puede parar o se usa la cantidad que hay, se para y no se continua??
//                if (loopbreak) {
//                    break;
//                }

                if (loopbreak) {
                    log.warn("error no hay sufientes mentores con el rol {} . se utilizara la cantidad disponible", filter1.rol());
                    limitMentor = mentorsStock;
                }

                while (list.size() < limitMentor) {

                    if (index == mentorList.size()) {
                        indexFiltersMentors.put(filter1.rol(), 0);
                        index = 0;
                    }

                    Mentor mentor = mentorList.get(index);

                    if (mentor.getRol().stream().anyMatch(s -> s.equalsIgnoreCase(filter1.rol())) && !filter1.technologies().isEmpty()) {
                        list.add(mentor);
                        indexFiltersMentors.put(filter1.rol(), index + 1);
                    }

                    if (mentor.getRol().stream().anyMatch(s -> s.equalsIgnoreCase(filter1.rol())) && filter1.technologies().isEmpty()) {
                        list.add(mentor);
                        indexFiltersMentors.put(filter1.rol(), index + 1);
                    }

                    index++;
                }


                team.getMentors().addAll(list);
            }

            //! Error no se completo el grupo
            if (team.getStudents().size() < filter.studentFilter().stream().mapToInt(TeamFilter::quantity).sum()) {
                log.warn("Este grupo no cumple la cantidad de estudiantes necesaria");
                break;
            }


            team.setTeamGroup(event.getTeamGroup());
            teams.add(team);

        }


        return teams;
    }


    private boolean teamExists(Event event, Team team) {
        return event.getTeamGroup().getTeams().stream().noneMatch(team1 -> team1.getId().equals(team.getId()));
    }

    private void setRegister(Event event) {
        event.getRegistration().getStudents().addAll(studentRepository.findAll());
        event.getRegistration().getMentors().addAll(mentorRepository.findAll());
        eventRepository.save(event);

    }
}
