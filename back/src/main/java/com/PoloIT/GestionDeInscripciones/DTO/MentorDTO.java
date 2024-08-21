package com.PoloIT.GestionDeInscripciones.DTO;

import java.util.Set;

public record MentorDTO(
        Long id,
        String name,
        String lastName,
        String company,
        Set<String> skills,
        Set<String> profiles,
        String linkedin
) {
    public MentorDTO(Long id, String name, String lastName, String company, Set<String> skills, Set<String> profiles, String linkedin) {
        this.id = id;
        this.name = name;
        this.lastName = lastName;
        this.company = company;
        this.skills = skills;
        this.profiles = profiles;
        this.linkedin = linkedin;
    }
}