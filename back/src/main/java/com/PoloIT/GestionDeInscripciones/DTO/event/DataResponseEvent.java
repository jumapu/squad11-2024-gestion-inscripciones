package com.PoloIT.GestionDeInscripciones.DTO.event;

import com.PoloIT.GestionDeInscripciones.DTO.admin.DataResponseAdmin;
import com.PoloIT.GestionDeInscripciones.DTO.registration.DataResponseRegistration;
import com.PoloIT.GestionDeInscripciones.Entity.Event;
import com.PoloIT.GestionDeInscripciones.Entity.Teams;

import java.time.LocalDateTime;

public record DataResponseEvent(Long id, String name, LocalDateTime createdAt, LocalDateTime updatedAt, DataResponseRegistration registrations, /*Teams teams,*/
                                DataResponseAdmin admin) {
    public DataResponseEvent(Event event) {
        this(event.getId(),event.getName(),event.getCreatedAt(), event.getUpdatedAt(), new DataResponseRegistration(event.getRegistration())/*, event.getTeams()*/,new DataResponseAdmin(event.getAdmin()));
    }
}
