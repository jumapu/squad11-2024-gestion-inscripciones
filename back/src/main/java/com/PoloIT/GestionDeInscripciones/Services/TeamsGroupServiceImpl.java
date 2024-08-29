package com.PoloIT.GestionDeInscripciones.Services;

import com.PoloIT.GestionDeInscripciones.Config.ExecptionControll.ResponseException;
import com.PoloIT.GestionDeInscripciones.DTO.TeamGroupFilter;
import com.PoloIT.GestionDeInscripciones.Entity.*;
import com.PoloIT.GestionDeInscripciones.Repository.EventRepository;
import com.PoloIT.GestionDeInscripciones.Repository.TeamsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class TeamsGroupServiceImpl {
    private final TeamsRepository teamsRepository;
    private final EventRepository eventRepository;

    public void createTeams(TeamGroupFilter filter, Long id) {
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new ResponseException("404", "ID NOT FOUND EVENT/REGISTRATION", HttpStatus.NOT_FOUND));

        generateGroup(event, filter);
    }


    private TeamGroup generateGroup(Event event, TeamGroupFilter filter) {

        TeamGroup teamGroup = new TeamGroup();
        Set<Student> studentsNotAccepted = new HashSet<>();

        int groups = filter.groups();

        if (groups < 0)
            groups = event.getRegistration().getStudents().size() + event.getRegistration().getMentors().size();

        for (int i = 0; i <= groups; i++) {
            int mentorIndex = i;

            Team team = new Team();

            int studentLimit = filter.studentFilter().get(i).quantity();
            String studentRol = filter.studentFilter().get(i).rol();
            Set<String> studentTechnologies = filter.studentFilter().get(i).technologies();

            for (int j = 0; i < studentLimit; i++) {
                Student student = event.getRegistration().getStudents().stream().toList().get(j);
                boolean bol = student.getRol().stream().filter(studentRol::equalsIgnoreCase).toList().isEmpty();
                if (bol && studentTechnologies.isEmpty()) {
                    team.getStudents().add(student);
                }
                if (bol && studentTechnologies.retainAll(student.getTechnologies())) {
                    team.getStudents().add(student);
                }
                //
                //? si el estudiante no cumple los filtro se guarda en una lista de espera.
                studentsNotAccepted.add(student);
            }


            int mentorLimit = filter.mentorFilter().get(i).quantity();
            String mentorRol = filter.mentorFilter().get(i).rol();
            Set<String> mentorTechnologies = filter.mentorFilter().get(i).technologies();

            for (int j = 0; i < mentorLimit; i++) {
                if (j > event.getRegistration().getMentors().size()) j = 0;

                Mentor mentor = event.getRegistration().getMentors().stream().toList().get(j);
                boolean bol = mentor.getRol().stream().filter(studentRol::equalsIgnoreCase).toList().isEmpty();
                if (bol && mentorTechnologies.isEmpty()) {
                    team.getMentors().add(mentor);
                }
                if (bol && mentorTechnologies.retainAll(mentor.getTechnologies())) {
                    team.getMentors().add(mentor);
                }
            }


        }

        return teamGroup;
    }


}
