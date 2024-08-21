package com.PoloIT.GestionDeInscripciones.DTO.EventsDTO;

import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;


public record DataRegisterEvent(
        @NotNull(message = "Name required")
        String name,
        @NotNull(message = "description required")
        String description,
        @NotNull(message = "Required enrollment start date ")
        LocalDateTime createdAt,
        @NotNull(message = "Required enrollment end date")
        LocalDateTime eventFinish
) {

}
