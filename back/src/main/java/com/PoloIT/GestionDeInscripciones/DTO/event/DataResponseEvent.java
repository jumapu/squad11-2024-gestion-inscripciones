package com.PoloIT.GestionDeInscripciones.DTO.event;

import com.PoloIT.GestionDeInscripciones.DTO.admin.DataResponseAdmin;
import com.PoloIT.GestionDeInscripciones.DTO.registration.DataResponseRegistration;
import com.PoloIT.GestionDeInscripciones.Entity.Event;

import java.time.LocalDateTime;

public record DataResponseEvent(Long id, String name, String description, LocalDateTime createdAt, LocalDateTime finishAt,
                                DataResponseRegistration registrations,
        //Faltaraia el DTO de team
        /*Teams teams,*/
                                DataResponseAdmin admin) {
    public DataResponseEvent(Event event) {

        this(event.getId(), event.getName(),event.getDescription(),event.getCreatedAt(), event.getFinishAt(),
                event.getRegistration() != null ? new DataResponseRegistration(event.getRegistration()) : null,
//                event.getTeams(),
                new DataResponseAdmin(event.getAdmin()));
    }
}
