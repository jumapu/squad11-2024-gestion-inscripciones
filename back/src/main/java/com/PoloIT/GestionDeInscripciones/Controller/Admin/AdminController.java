package com.PoloIT.GestionDeInscripciones.Controller.Admin;

import com.PoloIT.GestionDeInscripciones.DTO.MentorDTO;
import com.PoloIT.GestionDeInscripciones.DTO.StudentDTO;
import com.PoloIT.GestionDeInscripciones.DTO.admin.AdminUpdateDTO;
import com.PoloIT.GestionDeInscripciones.Entity.User;
import com.PoloIT.GestionDeInscripciones.Services.AdminServiceImpl;
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

import java.util.Map;

@RestController
@RequestMapping("/api/v1/admin")
@RequiredArgsConstructor
public class AdminController {
    private final UserServiceImpl userService;
    private final StudentServiceImpl studentService;
    private final MentorServiceImpl mentorServiceImpl;
    private final AdminServiceImpl adminService;
    private final HttpServletRequest request;

    @Transactional
    @DeleteMapping("deleteUser/{id}")
    public ResponseEntity<Map<String, String>> deleteUser(@PathVariable Long id) {
        userService.delete(id);
        return new ResponseEntity<>(Map.of("update", "user eliminado"), HttpStatus.OK);
    }
    @GetMapping("getStudent/{id}")
    public ResponseEntity<Map<String, StudentDTO>> getStudentByID(@PathVariable Long id) {
        StudentDTO body = studentService.getById(id);
        return new ResponseEntity<>(Map.of("Event", body), HttpStatus.OK);
    }
    @GetMapping("getMentor/{id}")
    public ResponseEntity<Map<String, MentorDTO>> getMentorByID(@PathVariable Long id) {
        MentorDTO body = mentorServiceImpl.getById(id);
        return new ResponseEntity<>(Map.of("Event", body), HttpStatus.OK);
    }
    @Transactional
    @PatchMapping("update")
    public ResponseEntity<Map<String, String>> update(@Valid @RequestBody AdminUpdateDTO adminUpdateDTO) {
        adminService.update(adminUpdateDTO);
        return new ResponseEntity<>(Map.of("update", "Datos actualizados"), HttpStatus.OK);
    }

    @PostMapping("img")
    public ResponseEntity<Map<String, String>> updateFile(@RequestPart("file") MultipartFile file) {
        adminService.changeImg(file, request);
        return new ResponseEntity<>(Map.of("Img", "Imagen cargada"), HttpStatus.CREATED);
    }

}
