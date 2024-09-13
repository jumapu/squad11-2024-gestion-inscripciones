package com.PoloIT.GestionDeInscripciones.Controller.Admin;

import com.PoloIT.GestionDeInscripciones.DTO.MentorDTO;
import com.PoloIT.GestionDeInscripciones.DTO.StudentDTO;
import com.PoloIT.GestionDeInscripciones.DTO.password.UpdatePasswordDTO;
import com.PoloIT.GestionDeInscripciones.Services.MentorServiceImpl;
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

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/admin/user/")
@RequiredArgsConstructor
public class UserController {
    private final UserServiceImpl userService;
    private final StudentServiceImpl studentService;
    private final HttpServletRequest request;
    private final MentorServiceImpl mentorService;

    @PostMapping("save/student")
    public ResponseEntity<Map<String, String>> registerStudent(@RequestPart("data") String data, @RequestPart("file") MultipartFile file) {
        userService.registerStudent(data, file, request);
        return new ResponseEntity<>(Map.of("Usuario", "Se creo el usuario."), HttpStatus.OK);
    }

    @PostMapping("save/mentor")
    public ResponseEntity<Map<String, String>> registerMentor(@RequestPart("data") String data, @RequestPart("file") MultipartFile file) {
//no entiendo que datos se se guardan en Data
        userService.registerMentor(data, file, request);
        return new ResponseEntity<>(Map.of("Usuario", "Se creo el usuario."), HttpStatus.OK);
    }

    @Transactional
    @DeleteMapping("{id}")
    public ResponseEntity<Map<String, String>> deleteStudent(@PathVariable Long id) {
        userService.delete(id);
        return new ResponseEntity<>(Map.of("Admin", "user eliminado"), HttpStatus.OK);
    }

    @GetMapping("student/{id}")
    public ResponseEntity<Map<String, StudentDTO>> getStudentById(@PathVariable Long id) {
        StudentDTO body = studentService.getById(id);
        return new ResponseEntity<>(Map.of("User", body), HttpStatus.OK);
    }

    @GetMapping("mentor/{id}")
    public ResponseEntity<Map<String, MentorDTO>> getMentorById(@PathVariable Long id) {
        MentorDTO body = mentorService.getById(id);
        return new ResponseEntity<>(Map.of("User", body), HttpStatus.OK);
    }

    @GetMapping("")
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
    @Transactional
    @PostMapping("updatePassword")
    public ResponseEntity<Map<String, String>> updatePassword(@Valid @RequestBody UpdatePasswordDTO updatePasswordDTO) {
        userService.updatePassword(updatePasswordDTO);
        return new ResponseEntity<>(Map.of("msg", "The password was updated successfully"), HttpStatus.ACCEPTED);
    }

}
