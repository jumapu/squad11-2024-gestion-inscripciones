package com.PoloIT.GestionDeInscripciones.Controller;


import com.PoloIT.GestionDeInscripciones.DTO.TeamsDTO;
import com.PoloIT.GestionDeInscripciones.Services.TeamsServiceImpl;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/event/teams/")
@AllArgsConstructor
public class TeamsController {

    private final TeamsServiceImpl teamsService;

    @PostMapping("create")
    public ResponseEntity<Map<String, String>> createTeams(@PathVariable Long id, TeamsDTO teamsDTO) {
        teamsService.createTeams(teamsDTO, id);
        return new ResponseEntity<>(Map.of("Event", "Successfully registered for the event"), HttpStatus.CREATED);
    }
}
