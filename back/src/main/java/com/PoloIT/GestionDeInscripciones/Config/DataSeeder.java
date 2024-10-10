package com.PoloIT.GestionDeInscripciones.Config;

import com.PoloIT.GestionDeInscripciones.Services.AuthServiceImpl;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataSeeder implements CommandLineRunner {

    private final AuthServiceImpl authService;

    public DataSeeder(AuthServiceImpl authService) {
        this.authService = authService;
    }

    @Override
    public void run(String... args) throws Exception {
        authService.seedData();
    }
}
