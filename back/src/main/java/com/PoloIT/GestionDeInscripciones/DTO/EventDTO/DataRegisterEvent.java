package com.PoloIT.GestionDeInscripciones.DTO.EventDTO;

import jakarta.validation.constraints.NotNull;


public record DataRegisterEvent(
        @NotNull(message = "Name required")
        String name
) {

}
