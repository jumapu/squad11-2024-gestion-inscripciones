package com.PoloIT.GestionDeInscripciones.Controller;

import com.PoloIT.GestionDeInscripciones.Entity.Student;
import com.PoloIT.GestionDeInscripciones.Enums.Rol;
import com.PoloIT.GestionDeInscripciones.Services.StudentService;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/student")
@CrossOrigin("*") //Agregar la ruta del front
public class StudentController {

    @Autowired
    private StudentService studentService;

    @PostMapping("/savestudent")
    public Student saveStudent(@RequestBody Student student) throws Exception {

        student.setUser(student.getUser());
        student.setName(student.getName());
        student.setSkills(student.getSkills());
        student.setCourses(student.getCourses());
        student.setProfiles(student.getProfiles());
        student.setLinkedin(student.getLinkedin());
        student.setRegistrations(student.getRegistrations());
        student.setTeam(student.getTeam());
        
        return studentService.save(student);
    }

    @GetMapping("/{username}")
    public Optional<Student> getStudent(@PathVariable("email") String email) {
        return studentService.findByEmail(email);
    }

    @DeleteMapping("/{Id}")
    public void deleteStudent(@PathVariable("Id") Long Id) {
        studentService.delete(Id);
    }

}
