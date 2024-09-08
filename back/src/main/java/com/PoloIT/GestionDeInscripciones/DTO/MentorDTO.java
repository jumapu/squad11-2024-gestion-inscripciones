package com.PoloIT.GestionDeInscripciones.DTO;

import com.PoloIT.GestionDeInscripciones.Entity.Mentor;

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

    //* Constructor que convierte una entidad Mentor a MentorDTO.
    public MentorDTO(Mentor mentor) {
        this(mentor.getId(), mentor.getName(), mentor.getLastName(), mentor.getCompany(), mentor.getTechnologies(), mentor.getRol(), mentor.getLinkedin());
    }

    //* Convierte una entidad Mentor a MentorDTO utilizando el DTO actual.
    public static MentorDTO fromMentor(Mentor mentor) {
        return new MentorDTO(
                mentor.getId(),
                mentor.getName(),
                mentor.getLastName(),
                mentor.getCompany(),
                mentor.getTechnologies(),
                mentor.getRol(),
                mentor.getLinkedin()
        );
    }

    //* Convierte otro MentorDTO a la entidad Mentor.
    public static Mentor toEntity(MentorDTO mentorDTO) {
        return Mentor.builder()
                .id(mentorDTO.id)
                .name(mentorDTO.name)
                .lastName(mentorDTO.lastName)
                .company(mentorDTO.company)
                .technologies(mentorDTO.skills)
                .rol(mentorDTO.profiles)
                .linkedin(mentorDTO.linkedin)
                .build();
    }

    //* Convierte una entidad Mentor a MentorDTO utilizando el DTO actual.
    public Mentor toEntity() {
        return Mentor.builder()
                .id(this.id)
                .name(this.name)
                .lastName(this.lastName)
                .company(this.company)
                .technologies(this.skills)
                .rol(this.profiles)
                .linkedin(this.linkedin)
                .build();
    }

    public Mentor convertMentor() {
        return Mentor.builder()
                .id(this.id)
                .name(this.name)
                .lastName(this.lastName)
                .company(this.company)
                .technologies(this.skills)
                .rol(this.profiles)
                .linkedin(this.linkedin)
                .build();
    }
}