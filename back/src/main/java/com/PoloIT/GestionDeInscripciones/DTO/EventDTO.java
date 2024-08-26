package com.PoloIT.GestionDeInscripciones.DTO;

import com.PoloIT.GestionDeInscripciones.Entity.Event;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;

public record EventDTO(
        Long id,
        @NotNull(message = "Name required")
        String name,
        @NotNull(message = "description required")
        String description,
        LocalDateTime createdAt,
        LocalDateTime finishAt,
        @NotNull(message = "registration required")
        RegistrationDTO registration,
        boolean isActive
) {


    public EventDTO(Event event) {
        this(
                event.getId(),
                event.getName(),
                event.getDescription(),
                event.getCreatedAt(),
                event.getFinishAt(),
                RegistrationDTO.from(event.getRegistration()),
                event.isActive()
        );
    }

}
