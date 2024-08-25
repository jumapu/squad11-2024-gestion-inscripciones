package com.PoloIT.GestionDeInscripciones.DTO;

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
    public EventDTO(Long id, @NotNull(message = "Name required")
    String name, @NotNull(message = "description required")
                    String description, LocalDateTime createdAt, LocalDateTime finishAt, @NotNull(message = "registration required")
                    RegistrationDTO registration, boolean isActive) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.createdAt = createdAt;
        this.finishAt = finishAt;
        this.registration = registration;
        this.isActive = isActive;
    }

}
