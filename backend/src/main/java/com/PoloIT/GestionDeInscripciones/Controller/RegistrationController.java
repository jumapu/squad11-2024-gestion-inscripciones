package com.PoloIT.GestionDeInscripciones.Controller;

import com.PoloIT.GestionDeInscripciones.DTO.EventDTO;
import com.PoloIT.GestionDeInscripciones.Services.EventServiceImpl;
import com.PoloIT.GestionDeInscripciones.Services.RegistrationServiceImpl;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@Tag(name = "Registros a Eventos", description = "API de control de Registro a Eventos")
@RestController
@RequestMapping("/api/v1/event/")
@AllArgsConstructor
public class RegistrationController {

    private final EventServiceImpl eventService;
    private final RegistrationServiceImpl registrationService;


    @GetMapping("register/{id}")
    public ResponseEntity<Map<String, String>> register(
            @PathVariable Long id) {
        registrationService.register(id);
        return new ResponseEntity<>(Map.of("Event", "Successfully registered for the event"), HttpStatus.CREATED);
    }


    @GetMapping("myEvents")
    public ResponseEntity<Map<String, List<EventDTO>>> myEvents(
    ) {
        List<EventDTO> body = eventService.myEvents();
        return new ResponseEntity<>(Map.of("events", body), HttpStatus.CREATED);
    }

    @GetMapping("allEvents")
    public ResponseEntity<Map<String, List<EventDTO>>> allEvents() {
        Map<String, List<EventDTO>> body = eventService.all();
        return new ResponseEntity<>(body, HttpStatus.OK);
    }


}
