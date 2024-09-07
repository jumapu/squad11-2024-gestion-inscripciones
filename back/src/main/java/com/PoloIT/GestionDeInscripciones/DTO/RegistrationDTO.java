package com.PoloIT.GestionDeInscripciones.DTO;

import com.PoloIT.GestionDeInscripciones.DTO.student.StudentDTO;
import com.PoloIT.GestionDeInscripciones.Entity.Registration;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;
import java.util.Set;
import java.util.stream.Collectors;

public record RegistrationDTO(
        @NotNull(message = "Required enrollment start date ")
        LocalDateTime createdAt,
        @NotNull(message = "Required enrollment end date")
        LocalDateTime finishAt,
        Set<StudentDTO> Students,
        Set<MentorDTO> Mentors,
        LocalDateTime updatedAt) {

    public RegistrationDTO(Registration registration) {
        this(registration.getCreatedAt(), registration.getFinishAt(), registration.getStudents().stream().map(StudentDTO::new).collect(Collectors.toSet()),
                registration.getMentors().stream().map(MentorDTO::new).collect(Collectors.toSet()), registration.getUpdatedAt());
    }

    public static RegistrationDTO from(Registration registration) {
        return new RegistrationDTO(registration);
    }
}
