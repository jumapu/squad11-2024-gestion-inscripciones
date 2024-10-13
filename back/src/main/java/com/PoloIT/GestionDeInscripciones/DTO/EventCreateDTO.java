package com.PoloIT.GestionDeInscripciones.DTO;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class EventCreateDTO {

    @JsonProperty("name")
    private String name;

    @JsonProperty("description")
    private String description;

    @JsonProperty("createdAt")
    private LocalDateTime createdAt;

    @JsonProperty("finishAt")
    private LocalDateTime finishAt;

    @JsonProperty("registration")
    private RegistrationDTO registration;

    @JsonProperty("isActive")
    private boolean isActive;


    public static class RegistrationDTO {
        @JsonProperty("createdAt")
        private LocalDateTime createdAt;

        @JsonProperty("finishAt")
        private LocalDateTime finishAt;

    }
}
