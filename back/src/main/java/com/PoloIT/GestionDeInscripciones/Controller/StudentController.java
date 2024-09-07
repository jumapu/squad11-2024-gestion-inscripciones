package com.PoloIT.GestionDeInscripciones.Controller;


import com.PoloIT.GestionDeInscripciones.DTO.student.StudentDTO;
import com.PoloIT.GestionDeInscripciones.Entity.Student;
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
@RequestMapping("/api/v1/student/")
@RequiredArgsConstructor
public class StudentController {

    private final StudentServiceImpl studentService;
    private final UserServiceImpl userService;

    @PatchMapping("update")
    public ResponseEntity<Map<String, String>> update(@Valid @RequestBody StudentDTO studentDTO) {
        studentService.update(studentDTO);
        return new ResponseEntity<>(Map.of("Admin", "Datos actualizados"), HttpStatus.OK);
    }

    @GetMapping("get")
    public ResponseEntity<Map<String,StudentDTO>> getStudentById() {
        StudentDTO body = new StudentDTO(userService.getUserRolContext(Student.class));
        return new ResponseEntity<>(Map.of("Event", body), HttpStatus.OK);
    }
    @Transactional
    @DeleteMapping("delete")
    public ResponseEntity<Map<String, String>> deleteStudent() {
        studentService.delete();
        return new ResponseEntity<>(Map.of("Admin", "Estudiante eliminado"), HttpStatus.OK);
    }
}
