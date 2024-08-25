package com.PoloIT.GestionDeInscripciones.Controller;

import com.PoloIT.GestionDeInscripciones.DTO.EventDTO;
import com.PoloIT.GestionDeInscripciones.DTO.event.DataListEvents;
import com.PoloIT.GestionDeInscripciones.DTO.event.DataRequestEvent;
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
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/event/")
@AllArgsConstructor
public class EventController {

    private final EventServiceImpl eventServiceImpl;
    private final UserServiceImpl userServiceImpl;

    @PostMapping("add")
    public ResponseEntity<DataResponseEvent> registerEvent(
            UriComponentsBuilder uriComponentsBuilder,
            @RequestBody @Valid DataRequestEvent dataRequestEvent) {
        Admin admin = userServiceImpl.getUserRolContext(Admin.class);
        Event event = eventServiceImpl.saveEventDB(dataRequestEvent,admin);
        DataResponseEvent dataResponseEvent = new DataResponseEvent(event);
        URI url = uriComponentsBuilder.path("/api/v1/event/{id}").buildAndExpand(event.getId()).toUri();
        return ResponseEntity.created(url).body(dataResponseEvent);
    }

    @PutMapping("update")
    @Transactional
    public ResponseEntity<Map<String,String>> updateEvent(
            @RequestBody @Valid DataUpdateEvent dataUpdateEvent) {
        eventServiceImpl.updateEventDB(dataUpdateEvent);
        Map<String, String> body = new HashMap<>();
        body.put("message","se modifico el evento");
        return ResponseEntity.ok(body);
    }

    @GetMapping("list/{size}/{page}")
    public ResponseEntity<Page<DataListEvents>> listEvents(
            @PathVariable int size,@PathVariable int page){
        Pageable pageable = PageRequest.of(page, size);
        return ResponseEntity.ok(eventServiceImpl.listEventsDB(pageable));
    }
    @GetMapping("all")
    public ResponseEntity<Map<String, List<EventDTO>>> listEvents() {
        return new ResponseEntity<>(eventServiceImpl.allEvent(), HttpStatus.OK);
    }


    @GetMapping("all/notActive")
    public ResponseEntity<Map<String, List<EventDTO>>> listEventsNotActive() {
        return new ResponseEntity<>(eventServiceImpl.allEventsNotActive(), HttpStatus.OK);
    }

    @GetMapping("all/active")
    public ResponseEntity<Map<String, List<EventDTO>>> listEventsActive() {
        return new ResponseEntity<>(eventServiceImpl.allEventsActive(), HttpStatus.OK);
    }


    @GetMapping("/{id}")
    public ResponseEntity<DataResponseEvent> getEvent(@PathVariable Long id) {
        Event event = eventServiceImpl.getEventDB(id);
        return ResponseEntity.ok(new DataResponseEvent(event));
    }

    @DeleteMapping("/delete/{id}")
    @Transactional
    public ResponseEntity<Map<String,String>> deleteEvent(@PathVariable Long id) {
        eventServiceImpl.deleteEventDB(id);
        Map<String, String> body = new HashMap<>();
        body.put("message","se elimino el evento");
        return ResponseEntity.ok(body);
    }
}

