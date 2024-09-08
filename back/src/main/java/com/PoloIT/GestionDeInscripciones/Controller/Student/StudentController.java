package com.PoloIT.GestionDeInscripciones.Controller.Student;


import com.PoloIT.GestionDeInscripciones.DTO.StudentDTO;
import com.PoloIT.GestionDeInscripciones.Entity.Student;
import com.PoloIT.GestionDeInscripciones.Services.StudentServiceImpl;
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
@RequestMapping("/api/v1/student/")
@RequiredArgsConstructor
public class StudentController {

    private final StudentServiceImpl studentService;
    private final UserServiceImpl userService;
    private final HttpServletRequest request;

    @PatchMapping("update")
    public ResponseEntity<Map<String, String>> update(@Valid @RequestBody StudentDTO studentDTO) {
        studentService.update(studentDTO);
        return new ResponseEntity<>(Map.of("Admin", "Datos actualizados"), HttpStatus.OK);
    }

    @GetMapping("get")
    public ResponseEntity<Map<String, StudentDTO>> getStudentById() {
        StudentDTO body = new StudentDTO(userService.getUserRolContext(Student.class));
        return new ResponseEntity<>(Map.of("Event", body), HttpStatus.OK);
    }


    @PostMapping("img")
    public ResponseEntity<Map<String, String>> registerEvent(@RequestPart("file") MultipartFile file) {
        studentService.changeImg(file, request);
        return new ResponseEntity<>(Map.of("Img", "Imagen cargada"), HttpStatus.CREATED);
    }

    @Transactional
    @DeleteMapping("delete")
    public ResponseEntity<Map<String, String>> deleteStudent() {
        studentService.delete();
        return new ResponseEntity<>(Map.of("Admin", "Estudiante eliminado"), HttpStatus.OK);
    }
}
