package com.PoloIT.GestionDeInscripciones.Controller.Admin;

import com.PoloIT.GestionDeInscripciones.DTO.StudentDTO;
import com.PoloIT.GestionDeInscripciones.DTO.TeamDTO;
import com.PoloIT.GestionDeInscripciones.DTO.TeamGroupFilterDTO;
import com.PoloIT.GestionDeInscripciones.Services.TeamsGroupServiceImpl;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Tag(name = "Equipos", description = "API de Controles para los Equipos")
@RestController
@RequestMapping("/api/v1/admin/event/team/")
@AllArgsConstructor
public class TeamGroupController {
    private final TeamsGroupServiceImpl teamsService;

    @PostMapping("create/{id}")
    public ResponseEntity<Map<String, String>> createGroups(
            @PathVariable Long id,
            @RequestBody TeamGroupFilterDTO filterDTO
    ) {

        teamsService.save(filterDTO, id);
        return new ResponseEntity<>(Map.of("Grupos", "Grupos creados"), HttpStatus.CREATED);
    }


    @GetMapping("studentNotAccepted/{id}")
    public ResponseEntity<Map<String, List<StudentDTO>>> getStudentDontTeam(
            @Parameter(description = "ID del evento", example = "1")
            @PathVariable Long id) {
        Map<String, List<StudentDTO>> studentNotAccepted = teamsService.getStudentDontTeam(id);
        return new ResponseEntity<>(studentNotAccepted, HttpStatus.CREATED);

    }


    @GetMapping("{id}")
    public ResponseEntity<Map<String, TeamDTO>> getTeam(
            @PathVariable Long id) {
        Map<String, TeamDTO> teamDTOM = teamsService.getTeam(id);
        return new ResponseEntity<>(teamDTOM, HttpStatus.CREATED);

    }

    @GetMapping("{id}/allTeams")
    public ResponseEntity<Map<String, Object>> allTeams(
            @PathVariable Long id) {
        Map<String, Object> teamDTOM = teamsService.allTeams(id);
        return new ResponseEntity<>(teamDTOM, HttpStatus.OK);

    }

    public ResponseEntity<Map<String, String>> update(
            @RequestBody()
            TeamDTO teamDTO) {
        teamsService.update(teamDTO);
        return new ResponseEntity<>(Map.of("Grupos", "Grupo Actualizado."), HttpStatus.CREATED);
    }


    @DeleteMapping("{id}")
    public ResponseEntity<Map<String, String>> delete(
            @Parameter()
            @PathVariable Long id) {
        teamsService.delete(id);
        return new ResponseEntity<>(Map.of("Grupos", "Grupo Eliminado"), HttpStatus.CREATED);
    }

}
