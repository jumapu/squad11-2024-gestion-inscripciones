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
    public static Mentor fromMentor(MentorDTO mentorDTO) {
        return Mentor.builder()
                .id(mentorDTO.id)
                .name(mentorDTO.name)
                .lastName(mentorDTO.lastName)
                .company(mentorDTO.company)
                .technologies(mentorDTO.skills)
                .rol(mentorDTO.profiles)
                .linkedin(mentorDTO.linkedin)
                .build();
    };
    }

    //* Convierte una entidad Mentor a MentorDTO utilizando el DTO actual.



    //* Convierte otro MentorDTO a la entidad Mentor.

