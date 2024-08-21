package com.PoloIT.GestionDeInscripciones.DTO.event;

import jakarta.validation.constraints.NotNull;


public record DataRegisterEvent(
        @NotNull(message = "Name required")
        String name
) {

}
