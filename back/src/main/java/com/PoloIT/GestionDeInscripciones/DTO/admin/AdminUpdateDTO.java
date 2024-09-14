package com.PoloIT.GestionDeInscripciones.DTO.admin;

import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;
import java.util.Set;

public record AdminUpdateDTO(
        Long id,
        @NotNull(message = "name requerido")
        String name,
        String email,
        String img,
        @NotNull(message = "lastname requerido")
        String lastName,
        @NotNull(message = "linkedin requerido")
        String linkedin
//        String dni,
//        String phone,
//        LocalDate birthdate,
//        String nationality
) {
}
