package com.PoloIT.GestionDeInscripciones.DTO;

import com.PoloIT.GestionDeInscripciones.Entity.Team;

import java.util.Set;
import java.util.stream.Collectors;

public record TeamDTO(
        Set<MentorDTO> mentors, Set<StudentDTO> students
) {
    public TeamDTO(Team team) {
        this(team.getMentors().stream().map(MentorDTO::new).collect(Collectors.toSet()), team.getStudents().stream().map(StudentDTO::new).collect(Collectors.toSet()));
    }

    public static TeamDTO converTeamDTO(Team team) {
        System.out.println("TeamDTO");
        return new TeamDTO(team);
    }
}
