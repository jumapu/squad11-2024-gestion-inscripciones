package com.PoloIT.GestionDeInscripciones.DTO;

import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;
import java.util.Set;

public record RegistrationDTO(

        @NotNull(message = "Required enrollment start date ")
        LocalDateTime createdAt,
        @NotNull(message = "Required enrollment end date")
        LocalDateTime finishAt,
        LocalDateTime updatedAt,
        Set<StudentDTO> students,
        Set<MentorDTO> mentors

) {

    public RegistrationDTO(LocalDateTime createdAt, LocalDateTime finishAt, LocalDateTime updatedAt, Set<StudentDTO> students, Set<MentorDTO> mentors) {
        this.createdAt = createdAt;
        this.finishAt = finishAt;
        this.updatedAt = updatedAt;
        this.students = students;
        this.mentors = mentors;
    }
}
