package com.PoloIT.GestionDeInscripciones.Controller;

import com.PoloIT.GestionDeInscripciones.Services.RegistrationServiceImpl;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/accessAll/")
@AllArgsConstructor
public class RegistrationController {

    private final RegistrationServiceImpl registrationService;

    @GetMapping("{id}")
    public ResponseEntity<Map<String, String>> registerEvent(@PathVariable Long id) {
        registrationService.registerEvent(id);
        return new ResponseEntity<>(Map.of("Event", "Successfully registered for the event"), HttpStatus.CREATED);
    }

}
