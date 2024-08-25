package com.PoloIT.GestionDeInscripciones.DTO.event;

import jakarta.validation.constraints.NotNull;


public record DataRequestEvent(
        @NotNull(message = "Name required")
        String name,
        String description
) {

}
