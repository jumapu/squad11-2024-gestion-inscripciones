package com.PoloIT.GestionDeInscripciones.DTO.EventDTO;

import com.PoloIT.GestionDeInscripciones.DTO.AdminDTO.DataResponseAdmin;
import com.PoloIT.GestionDeInscripciones.Entity.Event;
import com.PoloIT.GestionDeInscripciones.Entity.Registration;
import com.PoloIT.GestionDeInscripciones.Entity.Teams;

import java.time.LocalDateTime;

public record DataResponseEvent(Long id, String name, LocalDateTime createdAt, LocalDateTime updatedAt, Registration registration, Teams teams,
                                DataResponseAdmin admin) {
    public DataResponseEvent(Event event) {
        this(event.getId(),event.getName(),event.getCreatedAt(), event.getUpdatedAt(), event.getRegistration(), event.getTeams(),new DataResponseAdmin(event.getAdmin()));
    }
}
