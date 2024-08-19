package com.PoloIT.GestionDeInscripciones.Services;

import com.PoloIT.GestionDeInscripciones.DTO.EventDTO.DataRegisterEvent;
import com.PoloIT.GestionDeInscripciones.DTO.EventDTO.DataUpdateEvent;
import com.PoloIT.GestionDeInscripciones.Entity.Event;
import com.PoloIT.GestionDeInscripciones.Repository.EventRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;


@Service
@AllArgsConstructor
public class EventServiceIpml {

    private final EventRepository eventRepository;

    public Event saveEventDB(DataRegisterEvent dataRegisterEvent) {
        return eventRepository.save(new Event(dataRegisterEvent));
    }

    public Event updateEventDB(DataUpdateEvent dataUpdateEvent) {
        Event event = eventRepository.findById(dataUpdateEvent.id()).orElseThrow(() -> new RuntimeException("Event not found"));
        event.updateEvent(dataUpdateEvent);
        return event;

    }

    public Event deleteEventDB(Long id) {
        Event event = eventRepository.findById(id).orElseThrow(() -> new RuntimeException("Event not found"));
        event.deactivateEvent();
        return event;
    }

    public Event getEventDB(Long id) {
        return eventRepository.findById(id).orElseThrow(() -> new RuntimeException("Event not found"));
    }

//    public Page<DataListEvents> getAllEventDB(
//            Pageable pageable) {
//        return eventRepository.findAll(pageable).map(DataListEvents::new);
//    }
}
