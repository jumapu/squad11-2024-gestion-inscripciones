package com.PoloIT.GestionDeInscripciones.Controller;


import com.PoloIT.GestionDeInscripciones.DTO.MentorDTO;
import com.PoloIT.GestionDeInscripciones.Entity.Mentor;
import com.PoloIT.GestionDeInscripciones.Services.MentorServiceImpl;
import com.PoloIT.GestionDeInscripciones.Services.UserServiceImpl;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/mentor/")
@RequiredArgsConstructor
public class MentorController {

    private final MentorServiceImpl mentorService;
    private final UserServiceImpl userService;
// se repite con el de student, podria hacerlo en el userController
    @PatchMapping("update")
    public ResponseEntity<Map<String, String>> update(@Valid @RequestBody MentorDTO mentorDTO) {
        mentorService.update(mentorDTO);
        return new ResponseEntity<>(Map.of("Admin", "Datos actualizados"), HttpStatus.OK);
    }

    // se repite con el de student, podria hacerlo en el userController    @GetMapping("get")
    public ResponseEntity<Map<String,MentorDTO>> getStudentById() {
        MentorDTO body = new MentorDTO(userService.getUserRolContext(Mentor.class));
        return new ResponseEntity<>(Map.of("Event", body), HttpStatus.OK);
    }
    // se repite con el de student, podria hacerlo en el userController
    @Transactional
    @DeleteMapping("delete")
    public ResponseEntity<Map<String, String>> deleteStudent() {
        mentorService.delete();
        return new ResponseEntity<>(Map.of("Admin", "Mentor eliminado"), HttpStatus.OK);
    }
}
