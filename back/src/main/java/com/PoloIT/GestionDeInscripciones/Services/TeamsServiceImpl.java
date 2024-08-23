package com.PoloIT.GestionDeInscripciones.Services;

import com.PoloIT.GestionDeInscripciones.Config.ExecptionControll.ResponseException;
import com.PoloIT.GestionDeInscripciones.DTO.TeamsDTO;
import com.PoloIT.GestionDeInscripciones.Entity.Event;
import com.PoloIT.GestionDeInscripciones.Entity.Mentor;
import com.PoloIT.GestionDeInscripciones.Entity.Student;
import com.PoloIT.GestionDeInscripciones.Entity.Team;
import com.PoloIT.GestionDeInscripciones.Repository.EventRepository;
import com.PoloIT.GestionDeInscripciones.Repository.TeamsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class TeamsServiceImpl {
    private final TeamsRepository teamsRepository;
    private final EventRepository eventRepository;

    public void createTeams(TeamsDTO teamsDTO, Long id) {
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new ResponseException("404", "ID NOT FOUND EVENT/REGISTRATION", HttpStatus.NOT_FOUND));

        createTeamGroup(event, teamsDTO);
    }

    private Set<Team> createTeamGroup(Event event, TeamsDTO teamsDTO) {

        List<Team> teams = new ArrayList<>();
        int memberLimit = (int) Math.ceil((double) (event.getRegistration().getStudents().size() + event.getRegistration().getMentors().size()) / teamsDTO.groups());
        //  int count = 0;
        int countStudent = 0;
        int countMentor = 0;

        //poder ver si alguien se queda afuer
        int e = (event.getRegistration().getStudents().size() + event.getRegistration().getMentors().size());

        //  for (int i = 0; i <); i++) {
        for (int i = 0; i <= e; i++) {

            Team team = new Team();

            int limitStudent = memberLimit - (memberLimit - teamsDTO.limitStudent());
            int limitMentor = memberLimit - (memberLimit - teamsDTO.limitMentor());
            System.out.println("------------");
            System.out.println("memberLimit " + memberLimit);
            System.out.println("limitMentor " + limitMentor);
            System.out.println("limitStudent " + limitStudent);

            for (int j = 0; j < limitStudent; j++) {

                int index = j + countStudent;
                System.out.println("student " + event.getRegistration().getStudents().size());
                System.out.println("index " + index);

                if (index >= event.getRegistration().getStudents().size())
                    break;
                Student student = event.getRegistration().getStudents().stream().toList().get(index);
                team.getStudents().add(student);
            }

            for (int j = 0; j < limitMentor; j++) {
                int index = j + countMentor;
                System.out.println("metors " + event.getRegistration().getMentors().size());
                System.out.println("index " + index);
                if (index >= event.getRegistration().getMentors().size())
                    break;
                Mentor mentor = event.getRegistration().getMentors().stream().toList().get(index);
                team.getMentors().add(mentor);
            }
            System.out.println("------------");

            //   count += memberLimit;

            countMentor += limitMentor;
            countStudent += limitStudent;

            System.out.println("aaaaaaaaaaaaaaaaaaaaaaaaaa");
            System.out.println(team.getMentors().size());
            System.out.println(team.getStudents().size());
            System.out.println("aaaaaaaaaaaaaaaaaaaaaaaaaa");

            // si tems la lista de student y mentor esta vacia significa que no hay que crear mas grupos.
            if (team.getStudents().isEmpty() && team.getMentors().isEmpty()) {
                break;
            }
            teams.add(team);
        }

        // ver las incriptos que queador fuera.
        // con el lime de grupo sacamos de todo los primo grupos.


        teams.forEach((x) -> {
            System.out.println("team " + x.getId());
            x.getStudents().forEach(student -> {
                System.out.println(student.getId() + " " + student.getName());

            });
            x.getMentors().forEach(mentor -> {
                System.out.println(mentor.getId() + " " + mentor.getName());
            });
        });

        return null;
    }

}
