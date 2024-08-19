package com.PoloIT.GestionDeInscripciones.DTO.EventDTO;

import com.PoloIT.GestionDeInscripciones.Entity.Event;

import java.time.LocalDateTime;

public record DataListEvents(Long id,String name, LocalDateTime createdAt, LocalDateTime updatedAt) {
    public DataListEvents(Event event){
        this(event.getId(), event.getName(), event.getCreatedAt(), event.getUpdatedAt());
    }
}
