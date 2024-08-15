package com.PoloIT.GestionDeInscripciones.Controller;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/user/")
@AllArgsConstructor
public class DemoUser {
    @GetMapping()
    public String saludo() {
        return "User....";
    }
}
