package com.PoloIT.GestionDeInscripciones.Controller;


import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@AllArgsConstructor
public class AccessDemoController {


    @GetMapping("/api/v1/admin")
    public ResponseEntity<Map<String, String>> admin() {
        Map<String, String> body = new HashMap<>();
        body.put("ADMIN", "BIENVENIDO " + userContext());
        return new ResponseEntity<>(body, HttpStatus.OK);
    }

    @GetMapping("/api/v1/mentor")
    public ResponseEntity<Map<String, String>> mentor() {
        Map<String, String> body = new HashMap<>();
        body.put("MENTOR", "BIENVENIDO " + userContext());
        return new ResponseEntity<>(body, HttpStatus.OK);
    }

    @GetMapping("/api/v1/student")
    public ResponseEntity<Map<String, String>> student() {
        Map<String, String> body = new HashMap<>();
        body.put("STUDENT", "BIENVENIDO " + userContext());
        return new ResponseEntity<>(body, HttpStatus.OK);
    }

    private String userContext() {
        return SecurityContextHolder.getContext().getAuthentication().getName();
    }

}
