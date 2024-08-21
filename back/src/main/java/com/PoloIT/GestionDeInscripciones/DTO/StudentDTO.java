package com.PoloIT.GestionDeInscripciones.DTO;

import java.util.Set;

public record StudentDTO(
        Long id,
        String name,
        Set<String> skills,
        Set<String> courses,
        Set<String> profiles,
        String linkedin
) {
    public StudentDTO(Long id, String name, Set<String> skills, Set<String> courses, Set<String> profiles, String linkedin) {
        this.id = id;
        this.name = name;
        this.skills = skills;
        this.courses = courses;
        this.profiles = profiles;
        this.linkedin = linkedin;
    }
}
