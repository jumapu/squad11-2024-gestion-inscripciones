package com.PoloIT.GestionDeInscripciones.Controller;

import com.PoloIT.GestionDeInscripciones.DTO.password.UpdatePasswordDTO;
import com.PoloIT.GestionDeInscripciones.Services.UserServiceImpl;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/user/")
@AllArgsConstructor
public class UserController {
    private final UserServiceImpl userService;
    @Transactional
    @PostMapping("updatePassword")
    public ResponseEntity<Map<String, String>> updatePassword(@Valid @RequestBody UpdatePasswordDTO updatePasswordDTO) {
        userService.updatePassword(updatePasswordDTO);
        return new ResponseEntity<>(Map.of("msg", "The password was updated successfully"), HttpStatus.ACCEPTED);
    }
}
