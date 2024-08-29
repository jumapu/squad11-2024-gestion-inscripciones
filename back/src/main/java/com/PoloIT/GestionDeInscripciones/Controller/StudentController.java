package com.PoloIT.GestionDeInscripciones.Controller;


import com.PoloIT.GestionDeInscripciones.DTO.StudentDTO;
import com.PoloIT.GestionDeInscripciones.Services.StudentServiceImpl;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/student/")
@RequiredArgsConstructor
public class StudentController {

    private final StudentServiceImpl studentService;

    @PatchMapping("update")
    public ResponseEntity<Map<String, String>> update(@Valid @RequestBody StudentDTO studentDTO) {
        studentService.update(studentDTO);
        return new ResponseEntity<>(Map.of("Admin", "Datos actualizados"), HttpStatus.OK);
    }
}
