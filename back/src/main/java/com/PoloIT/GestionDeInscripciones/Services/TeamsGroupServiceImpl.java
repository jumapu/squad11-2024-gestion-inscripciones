package com.PoloIT.GestionDeInscripciones.Services;

import com.PoloIT.GestionDeInscripciones.Config.ExecptionControll.ResponseException;
import com.PoloIT.GestionDeInscripciones.DTO.TeamFilter;
import com.PoloIT.GestionDeInscripciones.DTO.TeamGroupFilter;
import com.PoloIT.GestionDeInscripciones.Entity.*;
import com.PoloIT.GestionDeInscripciones.Enums.Rol;
import com.PoloIT.GestionDeInscripciones.Repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TeamsGroupServiceImpl {
    private final PasswordEncoder encoder;
    private final TeamsRepository teamsRepository;
    private final EventRepository eventRepository;
    private final StudentRepository studentRepository;
    private final MentorRepository mentorRepository;
    private final UserRepository userRepository;

    public void createTeams(TeamGroupFilter filter, Long id) {
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new ResponseException("404", "ID NOT FOUND EVENT/REGISTRATION", HttpStatus.NOT_FOUND));

        generateGroup(event, filter);

    }


    private Set<Team> generateGroup(Event event, TeamGroupFilter filter) {
        Set<Team> teams = new HashSet<>();


        List<TeamFilter> studentFilter = filter.studentFilter();
        List<TeamFilter> mentorFilter = filter.mentorFilter();

        List<Student> studentList = event.getRegistration().getStudents().stream()
                .sorted(Comparator.comparing(Student::getId))
                .toList();

        List<Mentor> mentorList = event.getRegistration().getMentors().stream()
                .sorted(Comparator.comparing(Mentor::getId))
                .toList();

        Set<Student> studentAccepted = new HashSet<>();

        Map<String, Integer> indexFiltersStudent = new HashMap<>();
        Map<String, Integer> indexFiltersMentors = new HashMap<>();

        int groups = Optional.of(filter.groups()).orElse(studentList.size());

        for (int i = 0; i < groups; i++) {
            Team team = new Team();

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
                        studentAccepted.add(student);
                        continue;
                    }

                    if (student.getRol().stream().anyMatch(s -> s.equalsIgnoreCase(filter1.rol())) && filter1.technologies().isEmpty()) {
                        list.add(student);
                        indexFiltersStudent.put(filter1.rol(), k + 1);
                        studentAccepted.add(student);
                    }

                }

                if (list.size() < filter1.quantity()) {
                    System.out.println("solo hay " + list.size() + " " + filter1.rol() + " de los " + filter1.quantity() + " solicitados.");
                    break;
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
                if (loopbreak) {
                    System.out.println("error no hay sufientes " + filter1.rol());
                    break;
                }

//                if (loopbreak) {
//                    limitMentor = mentorsStock;
//                }

                // for (int k = index; list.size() < filter1.quantity(); k++) {
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


                System.out.println("\n");

                team.getMentors().addAll(list);
            }

            //Error no se completo el grupo
            if (team.getStudents().size() < filter.studentFilter().stream().mapToInt(TeamFilter::quantity).sum()) {
                System.out.println("Error no se pudo crear el grupo completo");
                break;
            }

//            Esto es sobre si no se completan los studiantes o mentores con la cantidad deseada se no se guarda el grupo
//            if (team.getStudents().size() < filter.studentFilter().stream().mapToInt(TeamFilter::quantity).sum() || team.getMentors().size() <filter.mentorFilter().stream().mapToInt(TeamFilter::quantity).sum()){
//                System.out.println("Error no se pudo crear el grupo completo");
//                break;
//            }

            teams.add(team);

        }


        System.out.println("\n");
        System.out.println("Grupos creados " + teams.size());
        for (Team team : teams) {
            team.getStudents().forEach(student -> System.out.println(student.getRol().toString() + " " + student.getName()));
            team.getMentors().forEach(student -> System.out.println(student.getName() + " " + student.getRol()));
            System.out.println("\n");
        }

        System.out.println("\n");

        System.out.println("Estudiantes no Aceptados ");
        //  studentList.stream().forEach(student -> System.out.println(student.getName() + " fue aceptado ? " + studentAccepted.stream().anyMatch(student1 -> student1.getId().equals(student.getId()))));

        Set<Student> studentNotAccepted = studentList.stream().filter(student -> studentAccepted.stream().noneMatch(student1 -> student1.getId().equals(student.getId()))).collect(Collectors.toSet());

        for (Student student : studentNotAccepted) {
            System.out.println("El estudiante " + student.getName() + " no fue aceptado");
        }
        return null;
    }


    public void seedData() {
        List<Student> students = new ArrayList<>();
        List<Mentor> mentors = new ArrayList<>();

        // Crear y agregar estudiantes
        for (int i = 1; i <= 5; i++) {
            students.add(createStudent("student" + i, Set.of("java developer", "python developer")));
        }
        for (int i = 6; i <= 7; i++) {
            students.add(createStudent("student" + i, Set.of("QA")));
        }
        for (int i = 8; i <= 12; i++) {
            students.add(createStudent("student" + i, Set.of("frontend developer")));
        }
        for (int i = 13; i <= 17; i++) {
            students.add(createStudent("student" + i, Set.of("UX/UI designer")));
            }

        // Crear y agregar mentores
        for (int i = 1; i <= 3; i++) {
            mentors.add(createMentor("mentor" + i, Set.of("java developer")));
        }
        for (int i = 4; i <= 5; i++) {
            mentors.add(createMentor("mentor" + i, Set.of("QA")));
        }
        for (int i = 6; i <= 8; i++) {
            mentors.add(createMentor("mentor" + i, Set.of("design")));
            }
        // Crear y agregar mentores con roles adicionales
        mentors.add(createMentor("mentor9", Set.of("DevOps")));
        mentors.add(createMentor("mentor10", Set.of("Project Manager")));

        // Guardar los estudiantes y mentores en la base de datos
        studentRepository.saveAll(students);
        mentorRepository.saveAll(mentors);

    }

    private Student createStudent(String username, Set<String> roles) {
        return Student.builder()
                .user(User.builder()
                        .password(encoder.encode("12345678"))
                        .email(username + "@gmail.com")
                        .rol(Rol.STUDENT)
                        .build())
                .name(username)
                .rol(roles)
                .build();
        }

    private Mentor createMentor(String username, Set<String> roles) {
        return Mentor.builder()
                .user(User.builder()
                        .password(encoder.encode("12345678"))
                        .email(username + "@gmail.com")
                        .rol(Rol.MENTOR)
                        .build())
                .rol(roles)
                .name(username)
                .build();
    }


}
