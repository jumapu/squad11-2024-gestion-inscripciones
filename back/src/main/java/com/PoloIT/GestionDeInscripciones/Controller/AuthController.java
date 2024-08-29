package com.PoloIT.GestionDeInscripciones.Controller;


import com.PoloIT.GestionDeInscripciones.DTO.UserDto;
import com.PoloIT.GestionDeInscripciones.Services.AuthServiceImpl;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/auth/")
@RequiredArgsConstructor
public class AuthController {

    private final AuthServiceImpl userService;

    @PostMapping("authentication")
    public ResponseEntity<Map<String, String>> authentication(@Valid @RequestBody UserDto userDto) {
        Map<String, String> body = new HashMap<>();
        body.put("JWT", userService.authenticate(userDto));
        return new ResponseEntity<>(body, HttpStatus.OK);
    }


    @PostMapping("register")
    public ResponseEntity<Map<String, String>> register(@Valid @RequestBody UserDto userDto) {
        Map<String, String> body = new HashMap<>();
        body.put("JWT", userService.register(userDto));
        return new ResponseEntity<>(body, HttpStatus.CREATED);
    }
}
