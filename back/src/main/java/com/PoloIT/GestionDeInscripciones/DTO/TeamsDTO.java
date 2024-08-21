package com.PoloIT.GestionDeInscripciones.DTO;

import jakarta.validation.constraints.NotNull;

public record TeamsDTO(
        @NotNull(message = "limitStudent required..")
        int limitStudent
) {
}
