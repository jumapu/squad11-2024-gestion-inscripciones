package com.PoloIT.GestionDeInscripciones.Controller;

import com.PoloIT.GestionDeInscripciones.DTO.TeamGroupFilter;
import com.PoloIT.GestionDeInscripciones.Services.TeamsGroupServiceImpl;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/admin/event/team/")
@AllArgsConstructor
public class TeamGroupController {
    private final TeamsGroupServiceImpl teamsService;

    @PostMapping("create/{id}")
    public void createGroups(@PathVariable Long id, @RequestBody TeamGroupFilter teamGroupFilter) {

        teamsService.createTeams(teamGroupFilter, id);
    }
}
