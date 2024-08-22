package com.PoloIT.GestionDeInscripciones.Controller;

import com.PoloIT.GestionDeInscripciones.DTO.event.DataListEvents;
import com.PoloIT.GestionDeInscripciones.DTO.event.DataRegisterEvent;
import com.PoloIT.GestionDeInscripciones.DTO.event.DataResponseEvent;
import com.PoloIT.GestionDeInscripciones.DTO.event.DataUpdateEvent;
import com.PoloIT.GestionDeInscripciones.Entity.Admin;
import com.PoloIT.GestionDeInscripciones.Entity.Event;
import com.PoloIT.GestionDeInscripciones.Services.EventServiceImpl;
import com.PoloIT.GestionDeInscripciones.Services.UserServiceImpl;
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
@RequestMapping("/api/v1/event/")
@AllArgsConstructor
public class EventController {

    private final EventServiceImpl eventServiceImpl;
    private final UserServiceImpl userServiceImpl;

    @PostMapping("add")
    public ResponseEntity<DataResponseEvent> registerEvent(
            UriComponentsBuilder uriComponentsBuilder,
            @RequestBody @Valid DataRegisterEvent dataRegisterEvent) {
        Admin admin = userServiceImpl.getUserRolContext(Admin.class);
        Event event = eventServiceImpl.saveEventDB(dataRegisterEvent,admin);
        DataResponseEvent dataResponseEvent = new DataResponseEvent(event);
        URI url = uriComponentsBuilder.path("/event/{id}").buildAndExpand(event.getId()).toUri();
        return ResponseEntity.created(url).body(dataResponseEvent);
    }

    @PutMapping("update")
    @Transactional
    public ResponseEntity<DataResponseEvent> updateEvent(
            @RequestBody @Valid DataUpdateEvent dataUpdateEvent) {
        Event event = eventServiceImpl.updateEventDB(dataUpdateEvent);

        //! ACA => no devolve la entidad, devolver un dto.
        return ResponseEntity.ok(new DataResponseEvent(event));
    }

    @GetMapping("list")
    public ResponseEntity<Page<DataListEvents>> listEvents(

            @PageableDefault(size = 5) Pageable pageable){
        return ResponseEntity.ok(eventServiceImpl.listEventsDB(pageable));
    }

    @GetMapping("/{id}")
    public ResponseEntity<DataResponseEvent> getEvent(@PathVariable Long id) {
        //! ACA => no devolve la entidad, devolver un dto.
        Event event = eventServiceImpl.getEventDB(id);
        return ResponseEntity.ok(new DataResponseEvent(event));
    }

    @DeleteMapping("/delete/{id}")
    @Transactional
    public ResponseEntity<DataResponseEvent> deleteEvent(@PathVariable Long id) {
        //! no hace falta devolver el objeto eliminado, solo un mensaje que confimacion que se elimino.
        Event event = eventServiceImpl.deleteEventDB(id);
        return ResponseEntity.ok(new DataResponseEvent(event));
    }
}
