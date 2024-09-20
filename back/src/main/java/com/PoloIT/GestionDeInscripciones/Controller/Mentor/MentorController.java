package com.PoloIT.GestionDeInscripciones.Controller.Mentor;


import com.PoloIT.GestionDeInscripciones.DTO.MentorDTO;
import com.PoloIT.GestionDeInscripciones.Entity.Mentor;
import com.PoloIT.GestionDeInscripciones.Services.MentorServiceImpl;
import com.PoloIT.GestionDeInscripciones.Services.UserServiceImpl;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/mentor/")
@RequiredArgsConstructor
public class MentorController {

    private final MentorServiceImpl mentorService;
    private final UserServiceImpl userService;
    private final HttpServletRequest request;

    @PatchMapping("update")
    public ResponseEntity<Map<String, String>> update(@Valid @RequestBody MentorDTO mentorDTO) {
        mentorService.update(mentorDTO);
        return new ResponseEntity<>(Map.of("update", "Datos actualizados"), HttpStatus.OK);
    }


    @GetMapping("get")
    public ResponseEntity<Map<String, MentorDTO>> getStudentById() {
        MentorDTO body = new MentorDTO(userService.getUserRolContext(Mentor.class));
        return new ResponseEntity<>(Map.of("Event", body), HttpStatus.OK);
    }
    @PostMapping("img")
    public ResponseEntity<Map<String, String>> updateFile(@RequestPart("file") MultipartFile file) {
        mentorService.changeImg(file, request);
        return new ResponseEntity<>(Map.of("Img", "Imagen cargada"), HttpStatus.CREATED);
    }

    @Transactional
    @DeleteMapping("delete")
    public ResponseEntity<Map<String, String>> deleteStudent() {
        mentorService.delete();
        return new ResponseEntity<>(Map.of("update", "Mentor eliminado"), HttpStatus.OK);
    }
}
