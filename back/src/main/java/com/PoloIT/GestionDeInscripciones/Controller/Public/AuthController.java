package com.PoloIT.GestionDeInscripciones.Controller.Public;


import com.PoloIT.GestionDeInscripciones.DTO.EmailResetPasswordDTO;
import com.PoloIT.GestionDeInscripciones.DTO.UserDto;
import com.PoloIT.GestionDeInscripciones.DTO.password.ResetPasswordDTO;
import com.PoloIT.GestionDeInscripciones.Services.AuthServiceImpl;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/auth/")
@RequiredArgsConstructor
public class AuthController {

    private final AuthServiceImpl userService;

    @PostMapping("authentication")
    public ResponseEntity<Map<String, String>> authentication(@Valid @RequestBody UserDto userDto) {
        Map<String, String> body = userService.authenticate(userDto);
        return new ResponseEntity<>(body, HttpStatus.OK);
    }


    @PostMapping("register")
    public ResponseEntity<Map<String, String>> register(@Valid @RequestBody UserDto userDto) {
        Map<String, String> body = userService.register(userDto);
        return new ResponseEntity<>(body, HttpStatus.CREATED);
    }

    //[1/9]se encarga de enviar un enlace de restablecimiento de contraseña a la direcciónde correo electrónico asociada a un usuario
    @PostMapping("sendResetPassword")
    public ResponseEntity<Map<String, String>> sendResetPassword(@Valid() @RequestBody EmailResetPasswordDTO emailResetPasswordDTO) {
        userService.sendPasswordResetLink(emailResetPasswordDTO);
        return new ResponseEntity<>(Map.of("msg", "The email was sent to change the password"), HttpStatus.ACCEPTED);
    }

    @Transactional
//[7/9]Este controlador se encarga de aplicar el nuevo password del usuario después de que se ha enviado el enlace de restablecimiento de contraseña
    @PostMapping("resetPassword")
    public ResponseEntity<Map<String, String>> resetPassword(@Valid @RequestBody ResetPasswordDTO resetPasswordDTO) {
//        para que se usa el token enviado
//        el token(que contiene el mail) se pasa por el encabezado, o sea que esta en el contexto de autenticacion
        userService.applyNewPassword(resetPasswordDTO);
        return new ResponseEntity<>(Map.of("msg", "The password was changed successfully"), HttpStatus.ACCEPTED);
    }
}
