package com.PoloIT.GestionDeInscripciones.DTO.student;

import com.PoloIT.GestionDeInscripciones.Entity.Student;

public record DataResponseStudent(Long id,String email, String name) {
    public DataResponseStudent(Student student) {
        this(student.getUser().getId(), student.getUser().getEmail(), student.getName());
    }
}
