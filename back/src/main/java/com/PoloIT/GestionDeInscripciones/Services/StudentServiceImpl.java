package com.PoloIT.GestionDeInscripciones.Services;

import com.PoloIT.GestionDeInscripciones.Config.ExecptionControll.ResponseException;
import com.PoloIT.GestionDeInscripciones.DTO.student.StudentDTO;
import com.PoloIT.GestionDeInscripciones.Entity.Student;
import com.PoloIT.GestionDeInscripciones.Repository.StudentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class StudentServiceImpl {
    private final StudentRepository studentRepository;
    private final UserServiceImpl userService;

    public void update(StudentDTO studentDTO) {
        studentRepository.save(dateUpdate(studentDTO));
    }

    private Student dateUpdate(StudentDTO studentDTO) {

        Student student = StudentDTO.fromStudent(studentDTO);

        student.setId(userService.getUserContext().getId());
        return student;
    }

    public StudentDTO getById(Long id) {
        return studentRepository.findById(id).map(StudentDTO::new)
                .orElseThrow(() -> new ResponseException("404", "Studen not Fount", HttpStatus.NOT_FOUND));
    }

    public void delete() {
        userService.getUserContext().setDelete(true);
    }
}
