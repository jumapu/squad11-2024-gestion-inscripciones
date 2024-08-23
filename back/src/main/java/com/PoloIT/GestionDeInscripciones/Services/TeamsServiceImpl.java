package com.PoloIT.GestionDeInscripciones.Services;

import com.PoloIT.GestionDeInscripciones.Config.ExecptionControll.ResponseException;
import com.PoloIT.GestionDeInscripciones.DTO.TeamsDTO;
import com.PoloIT.GestionDeInscripciones.Entity.Event;
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
        int integrantLimit = (int) Math.ceil((double) event.getRegistration().getStudents().size() / teamsDTO.groups());
        int count = 0;
        System.out.println("count " + count);

        for (int i = 0; i < teamsDTO.groups(); i++) {
            Team team = new Team();

            for (int j = 0; j < integrantLimit; j++) {
                if ((j + count) >= event.getRegistration().getStudents().size())
                    break;
                Student student = event.getRegistration().getStudents().stream().toList().get(j + count);
                team.getStudents().add(student);
            }

            count += integrantLimit;

            teams.add(team);
        }

        System.out.println(teams.size());
        return null;
    }

}
