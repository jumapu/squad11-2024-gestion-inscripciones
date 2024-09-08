package com.PoloIT.GestionDeInscripciones.Controller.Mentor;

import com.PoloIT.GestionDeInscripciones.DTO.EventDTO;
import com.PoloIT.GestionDeInscripciones.Services.EventServiceImpl;
import com.PoloIT.GestionDeInscripciones.Services.RegistrationServiceImpl;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/event/")
@AllArgsConstructor
public class EventController {

    private final EventServiceImpl eventService;
    private final RegistrationServiceImpl registrationService;

    @GetMapping("register/{id}")
    public ResponseEntity<Map<String, String>> register(@PathVariable Long id) {
        registrationService.register(id);
        return new ResponseEntity<>(Map.of("Event", "Successfully registered for the event"), HttpStatus.CREATED);
    }

    @GetMapping("myEvent/{id}")
    public ResponseEntity<Map<String, List<EventDTO>>> myEvents(@PathVariable Long id) {
        List<EventDTO> body = eventService.myEvents(id);
        return new ResponseEntity<>(Map.of("Mis eventos", body), HttpStatus.CREATED);
    }


    @GetMapping("all")
    public ResponseEntity<Map<String, List<EventDTO>>> allEvent(@PathVariable Long id) {
        Map<String, List<EventDTO>> body = eventService.all();
        return new ResponseEntity<>(body, HttpStatus.CREATED);
    }


}
