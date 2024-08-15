package com.PoloIT.GestionDeInscripciones.Controller;


import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/admin/")
@AllArgsConstructor
public class DemoAdmin {
    @GetMapping()
    public String saludo() {
        return "ADMIN....";
    }
}
