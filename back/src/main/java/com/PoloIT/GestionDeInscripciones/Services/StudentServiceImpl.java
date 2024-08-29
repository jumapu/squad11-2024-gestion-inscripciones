package com.PoloIT.GestionDeInscripciones.Services;

import com.PoloIT.GestionDeInscripciones.Config.ExecptionControll.ResponseException;
import com.PoloIT.GestionDeInscripciones.DTO.StudentDTO;
import com.PoloIT.GestionDeInscripciones.Entity.Student;
import com.PoloIT.GestionDeInscripciones.Entity.User;
import com.PoloIT.GestionDeInscripciones.Repository.StudentRepository;
import com.PoloIT.GestionDeInscripciones.Repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
@RequiredArgsConstructor
public class StudentServiceImpl {
    private final UserRepository userRepository;
    private final StudentRepository studentRepository;

    public void update(StudentDTO studentDTO) {
        studentRepository.save(dateUpdate(studentDTO));
    }

    private Student dateUpdate(StudentDTO studentDTO) {
        if (Objects.isNull(studentDTO.id()))
            throw new ResponseException("404", "Id requerido", HttpStatus.NOT_FOUND);

        Student student = StudentDTO.fromStudent(studentDTO);

        student.setId(getStudent().getId());
        return student;
    }

    private Student getStudent() {
        return userRepository.findByEmail(SecurityContextHolder.getContext().getAuthentication().getName())
                .map(User::getStudent)
                .orElseThrow(() -> new ResponseException("505", "Internal Server Error", HttpStatus.INTERNAL_SERVER_ERROR));
    }
}
