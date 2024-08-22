package com.PoloIT.GestionDeInscripciones.DTO.event;

import com.PoloIT.GestionDeInscripciones.Entity.Event;

import java.time.LocalDateTime;

public record DataListEvents(Long id,String name, LocalDateTime createdAt, LocalDateTime finishAt) {
    public DataListEvents(Event event){
        this(event.getId(), event.getName(), event.getCreatedAt(), event.getFinishAt());
    }
}
