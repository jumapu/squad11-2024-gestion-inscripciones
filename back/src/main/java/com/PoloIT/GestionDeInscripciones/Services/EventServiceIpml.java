package com.PoloIT.GestionDeInscripciones.Services;

import com.PoloIT.GestionDeInscripciones.Config.ExecptionControll.ResponseException;
import com.PoloIT.GestionDeInscripciones.DTO.EventDTO.DataListEvents;
import com.PoloIT.GestionDeInscripciones.DTO.EventDTO.DataRegisterEvent;
import com.PoloIT.GestionDeInscripciones.DTO.EventDTO.DataUpdateEvent;
import com.PoloIT.GestionDeInscripciones.Entity.Admin;
import com.PoloIT.GestionDeInscripciones.Entity.Event;
import com.PoloIT.GestionDeInscripciones.Entity.User;
import com.PoloIT.GestionDeInscripciones.Repository.EventRepository;
import com.PoloIT.GestionDeInscripciones.Repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;


@Service
@AllArgsConstructor
public class EventServiceIpml {

    private final EventRepository eventRepository;


    public Event saveEventDB(DataRegisterEvent dataRegisterEvent, Admin admin) {
        return eventRepository.save(new Event(dataRegisterEvent, admin));
    }

    public Event updateEventDB(DataUpdateEvent dataUpdateEvent) {
        Event event = eventRepository.findById(dataUpdateEvent.id()).orElseThrow(() -> new ResponseException("404","Not Found Event", HttpStatus.NOT_FOUND));
        event.updateEvent(dataUpdateEvent);
        return event;

    }

    public Event deleteEventDB(Long id) {
        Event event = eventRepository.findById(id).orElseThrow(() -> new ResponseException("404","Not Found Event", HttpStatus.NOT_FOUND));
        event.deactivateEvent();
        return event;
    }

    public Event getEventDB(Long id) {
        return eventRepository.findById(id).orElseThrow(() -> new ResponseException("404", "Not Found Event", HttpStatus.NOT_FOUND));
    }

    public Page<DataListEvents> listEventsDB(Pageable pageable) {
        return eventRepository.findAll(pageable).map(DataListEvents::new);
    }


}


