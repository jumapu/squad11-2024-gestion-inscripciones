package com.PoloIT.GestionDeInscripciones.DTO.event;

import com.PoloIT.GestionDeInscripciones.DTO.admin.DataResponseAdmin;
import com.PoloIT.GestionDeInscripciones.DTO.registration.DataResponseRegistration;
import com.PoloIT.GestionDeInscripciones.Entity.Event;

import java.time.LocalDateTime;

public record DataResponseEvent(Long id, String name, LocalDateTime createdAt,
                                LocalDateTime finishAt, DataResponseRegistration registrations,
        //Faltaraia el DTO de team
        /*Teams teams,*/DataResponseAdmin admin) {
    public DataResponseEvent(Event event) {
        this(event.getId(),event.getName(),event.getCreatedAt(), event.getFinishAt(),
                new DataResponseRegistration(event.getRegistration())/*, event.getTeams()*/,
                new DataResponseAdmin(event.getAdmin()));
    }
}
