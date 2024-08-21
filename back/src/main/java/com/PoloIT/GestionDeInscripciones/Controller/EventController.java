package com.PoloIT.GestionDeInscripciones.Controller;

import com.PoloIT.GestionDeInscripciones.DTO.EventDTO;
import com.PoloIT.GestionDeInscripciones.DTO.EventsDTO.DataResponseEvent;
import com.PoloIT.GestionDeInscripciones.DTO.EventsDTO.DataUpdateEvent;
import com.PoloIT.GestionDeInscripciones.Entity.Event;
import com.PoloIT.GestionDeInscripciones.Services.EventServiceImpl;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/admin/event/")
@AllArgsConstructor
public class EventController {
    private final EventServiceImpl eventServiceImpl;

    @PostMapping("save")
    public ResponseEntity<Map<String, String>> save(@RequestBody @Valid EventDTO eventDTO) {
        eventServiceImpl.save(eventDTO);
        return new ResponseEntity<>(Map.of("Event", "Event register"), HttpStatus.CREATED);
    }


    @PutMapping("update")
    @Transactional
    public ResponseEntity<DataResponseEvent> updateEvent(
            @RequestBody @Valid DataUpdateEvent dataUpdateEvent) {
        Event event = eventServiceImpl.updateEventDB(dataUpdateEvent);

        //! ACA => no devolve la entidad, devolver un dto.
        return ResponseEntity.ok(new DataResponseEvent(event));
    }

    @GetMapping("all")
    public ResponseEntity<Map<String, List<EventDTO>>> listEvents() {
        return new ResponseEntity<>(eventServiceImpl.allEvents(), HttpStatus.OK);
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
