package com.PoloIT.GestionDeInscripciones.DTO;

import com.PoloIT.GestionDeInscripciones.Entity.Mentor;

import java.util.Set;

public record MentorDTO(
        Long id,
        String name,
        String lastName,
        String company,
        Set<String> rol,
        String imgUrl

) {

    //* Constructor que convierte una entidad Mentor a MentorDTO.
    public MentorDTO(Mentor mentor) {
        this(
                mentor.getId(),
                mentor.getName(),
                mentor.getLastName(),
                mentor.getCompany(),
                mentor.getRol(),
                mentor.getImgUrl()

        );
    }

    //* Convierte una entidad Mentor a MentorDTO utilizando el DTO actual.
    public static MentorDTO fromMentorDTO(Mentor mentor) {
        return new MentorDTO(
                mentor.getId(),
                mentor.getName(),
                mentor.getLastName(),
                mentor.getCompany(),
                mentor.getRol(),
                mentor.getImgUrl()


        );
    }

    //* Convierte un MentorDTO a la entidad Mentor.
    public static Mentor fromMentor(MentorDTO mentorDTO) {
        return Mentor.builder()
                .id(mentorDTO.id)
                .name(mentorDTO.name)
                .lastName(mentorDTO.lastName)
                .company(mentorDTO.company)
                .build();
    }
}

