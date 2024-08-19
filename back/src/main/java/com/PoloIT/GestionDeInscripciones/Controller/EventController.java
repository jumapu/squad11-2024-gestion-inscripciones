package com.PoloIT.GestionDeInscripciones.Controller;

import com.PoloIT.GestionDeInscripciones.DTO.EventDTO.DataListEvents;
import com.PoloIT.GestionDeInscripciones.DTO.EventDTO.DataRegisterEvent;
import com.PoloIT.GestionDeInscripciones.DTO.EventDTO.DataResponseEvent;
import com.PoloIT.GestionDeInscripciones.DTO.EventDTO.DataUpdateEvent;
import com.PoloIT.GestionDeInscripciones.Entity.Event;
import com.PoloIT.GestionDeInscripciones.Repository.EventRepository;
import com.PoloIT.GestionDeInscripciones.Services.EventServiceIpml;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;

@RestController
@RequestMapping("/api/v1/event")
@AllArgsConstructor
public class EventController {
    private final EventRepository eventRepository;
    private final EventServiceIpml eventServiceIpml;

    @PostMapping("add")
    public ResponseEntity<DataResponseEvent> registerEvent(
            UriComponentsBuilder uriComponentsBuilder,
            @RequestBody @Valid DataRegisterEvent dataRegisterEvent) {

        Event event = eventServiceIpml.saveEventDB(dataRegisterEvent);
        DataResponseEvent dataResponseEvent = new DataResponseEvent(event);
        URI url = uriComponentsBuilder.path("/event/{id}").buildAndExpand(event.getId()).toUri();
        return ResponseEntity.created(url).body(dataResponseEvent);
    }

    @PutMapping("update")
    @Transactional
    public ResponseEntity<DataResponseEvent> updateEvent(
            @RequestBody @Valid DataUpdateEvent dataUpdateEvent) {

        Event event=eventServiceIpml.updateEventDB(dataUpdateEvent);
        return ResponseEntity.ok(new DataResponseEvent(event));
    }

    @GetMapping("list")
    public ResponseEntity<Page<DataListEvents>> listEvents(
            @PageableDefault(size = 5) Pageable pageable){
        //me falta agregarle esl servivio
        return ResponseEntity.ok(eventRepository.findAll(pageable).map(DataListEvents::new));
    }
    @GetMapping("/{id}")
    public ResponseEntity<DataResponseEvent> getEvent(@PathVariable Long id){
        Event event = eventServiceIpml.getEventDB(id);
        return ResponseEntity.ok(new DataResponseEvent(event));
    }

    @DeleteMapping("/delete/{id}")
    @Transactional
    public ResponseEntity<DataResponseEvent> deleteEvent(@PathVariable Long id){
        Event event = eventServiceIpml.deleteEventDB(id);
        return ResponseEntity.ok(new DataResponseEvent(event));
    }
}
