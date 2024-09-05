package com.PoloIT.GestionDeInscripciones.DTO;

import com.PoloIT.GestionDeInscripciones.Entity.Event;
import com.PoloIT.GestionDeInscripciones.Entity.Registration;
import com.PoloIT.GestionDeInscripciones.Entity.TeamGroup;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;

public record EventDTO(
        Long id,
        @NotNull(message = "Name required")
        @NotEmpty(message = "Name required")
        String name,
        @NotNull(message = "description required")
        @NotEmpty(message = "description required")
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
                RegistrationDTO.convertRegistrationDTO(event.getRegistration()),
                event.isActive()
        );
    }

    //
    public static Event fromEvent(EventDTO eventDTO) {
        Event event = Event.builder()
                .name(eventDTO.name())
                .registration(Registration.builder()
                        .finishAt(eventDTO.registration().finishAt())
                        .createdAt(eventDTO.registration().createdAt())
                        .build())
                .teamGroup(TeamGroup.builder()
                        .updatedAt(eventDTO.registration().createdAt())
                        .build())
                .description(eventDTO.description())
                .createdAt(eventDTO.createdAt())
                .finishAt(eventDTO.finishAt())
                .isActive(true)
                .build();
        event.getRegistration().setEvent(event);
        event.getTeamGroup().setEvent(event);
        return event;
    }
}
