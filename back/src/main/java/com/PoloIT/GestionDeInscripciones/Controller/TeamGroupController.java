package com.PoloIT.GestionDeInscripciones.Controller;

import com.PoloIT.GestionDeInscripciones.DTO.TeamGroupFilterDTO;
import com.PoloIT.GestionDeInscripciones.Services.TeamsGroupServiceImpl;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/admin/event/team/")
@AllArgsConstructor
public class TeamGroupController {
    private final TeamsGroupServiceImpl teamsService;

    @PostMapping("create/{id}")
    public void createGroups(@PathVariable Long id, @RequestBody TeamGroupFilterDTO teamGroupFilterDTO) {

        teamsService.save(teamGroupFilterDTO, id);
    }
}
