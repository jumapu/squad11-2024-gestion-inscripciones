package com.PoloIT.GestionDeInscripciones.DTO.EventsDTO;

import com.PoloIT.GestionDeInscripciones.Entity.Event;
import com.PoloIT.GestionDeInscripciones.Entity.Registration;
import com.PoloIT.GestionDeInscripciones.Entity.TeamGroup;

import java.time.LocalDateTime;

public record DataResponseEvent(Long id, String name, LocalDateTime createdAt, LocalDateTime updatedAt,
                                Registration registration, TeamGroup teamGroup) {
    public DataResponseEvent(Event event) {
        this(event.getId(), event.getName(), event.getCreatedAt(), event.getUpdatedAt(), event.getRegistration(), event.getTeamGroup());
    }
}
