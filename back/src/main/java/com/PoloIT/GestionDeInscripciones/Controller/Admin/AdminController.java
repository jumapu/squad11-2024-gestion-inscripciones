package com.PoloIT.GestionDeInscripciones.Controller.Admin;

import com.PoloIT.GestionDeInscripciones.DTO.StudentDTO;
import com.PoloIT.GestionDeInscripciones.Services.StudentServiceImpl;
import com.PoloIT.GestionDeInscripciones.Services.UserServiceImpl;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/admin")
@RequiredArgsConstructor
public class AdminController {
    private final UserServiceImpl userService;
    private final StudentServiceImpl studentService;
    @Transactional
    @DeleteMapping("deleteUser/{id}")
    public ResponseEntity<Map<String, String>> deleteStudent(@PathVariable Long id) {
        userService.delete(id);
        return new ResponseEntity<>(Map.of("Admin", "user eliminado"), HttpStatus.OK);
    }
    @GetMapping("getUser/{id}")
    public ResponseEntity<Map<String, StudentDTO>> getStudentById(@PathVariable Long id) {
        StudentDTO body = studentService.getById(id);
        return new ResponseEntity<>(Map.of("Event", body), HttpStatus.OK);
    }

}
