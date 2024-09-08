package com.PoloIT.GestionDeInscripciones.Controller;

import com.PoloIT.GestionDeInscripciones.DTO.MentorDTO;
import com.PoloIT.GestionDeInscripciones.DTO.student.StudentDTO;
import com.PoloIT.GestionDeInscripciones.Services.MentorServiceImpl;
import com.PoloIT.GestionDeInscripciones.Services.StudentServiceImpl;
import com.PoloIT.GestionDeInscripciones.Services.UserServiceImpl;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/admin")
@RequiredArgsConstructor
public class AdminController {
    private final UserServiceImpl userService;
    private final StudentServiceImpl studentService;

    private final MentorServiceImpl mentorService;

    @Transactional
    @DeleteMapping("deleteUser/{id}")
    public ResponseEntity<Map<String, String>> deleteStudent(@PathVariable Long id) {
        userService.delete(id);
        return new ResponseEntity<>(Map.of("Admin", "user eliminado"), HttpStatus.OK);
    }

    @GetMapping("getUser/{id}")
    public ResponseEntity<Map<String, StudentDTO>> getStudentById(@PathVariable Long id) {
        StudentDTO body = studentService.getById(id);
        return new ResponseEntity<>(Map.of("User", body), HttpStatus.OK);
    }

    @GetMapping("user")
    public ResponseEntity<Map<String, Object>> allUser(@PathVariable Long id) {
        Map<String, List<MentorDTO>> allMentor = mentorService.allMentor();
        Map<String, List<StudentDTO>> allStudent = studentService.allStudent();


        return new ResponseEntity<>(Map.of("Student", allStudent, "Mentors", allMentor), HttpStatus.OK);
    }

    @GetMapping("student")
    public ResponseEntity<Map<String, List<StudentDTO>>> allStudent() {
        Map<String, List<StudentDTO>> body = studentService.allStudent();
        return new ResponseEntity<>(body, HttpStatus.OK);
    }

    @GetMapping("mentor")
    public ResponseEntity<Map<String, List<MentorDTO>>> allMentors() {
        Map<String, List<MentorDTO>> body = mentorService.allMentor();
        return new ResponseEntity<>(body, HttpStatus.OK);
    }

}
