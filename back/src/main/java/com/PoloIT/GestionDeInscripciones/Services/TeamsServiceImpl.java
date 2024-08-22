package com.PoloIT.GestionDeInscripciones.Services;

import com.PoloIT.GestionDeInscripciones.Config.ExecptionControll.ResponseException;
import com.PoloIT.GestionDeInscripciones.DTO.TeamsDTO;
import com.PoloIT.GestionDeInscripciones.Entity.Event;
import com.PoloIT.GestionDeInscripciones.Entity.Team;
import com.PoloIT.GestionDeInscripciones.Repository.EventRepository;
import com.PoloIT.GestionDeInscripciones.Repository.TeamsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
@RequiredArgsConstructor
public class TeamsServiceImpl {
    private final TeamsRepository teamsRepository;
    private final EventRepository eventRepository;

    public void createTeams(TeamsDTO teamsDTO, Long id) {
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new ResponseException("404", "ID NOT FOUND EVENT/REGISTRATION", HttpStatus.NOT_FOUND));

//        createTeamGroup(event, teamsDTO);
    }

//    private Set<Team> createTeamGroup(Event event, TeamsDTO teamsDTO) {
//    }

}
