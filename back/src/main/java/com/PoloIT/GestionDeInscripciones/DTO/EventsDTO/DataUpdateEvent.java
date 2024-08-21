package com.PoloIT.GestionDeInscripciones.DTO.EventsDTO;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record DataUpdateEvent(
        @NotNull(message = "ID required")
        Long id,
        @NotBlank(message = "Name required")
        @NotNull(message = "Name required")
        String name
) {

}
