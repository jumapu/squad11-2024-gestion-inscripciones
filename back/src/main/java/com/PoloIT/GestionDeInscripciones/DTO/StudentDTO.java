package com.PoloIT.GestionDeInscripciones.DTO;

import com.PoloIT.GestionDeInscripciones.Entity.Student;

import java.util.Set;

public record StudentDTO(
        Long id,
        String name,
        Set<String> skills,
        Set<String> courses,
        Set<String> profiles,
        String linkedin
) {

    //* Constructor que convierte una entidad Student a StudentDTO.
    public StudentDTO(Student student) {
        this(
                student.getId(),
                student.getName(),
                student.getTechnologies(),
                student.getCourses(),
                student.getRol(),
                student.getLinkedin()
        );
    }

    //* Convierte una entidad Student a StudentDTO utilizando el DTO actual.
    public static StudentDTO fromStudent(Student student) {
        return new StudentDTO(
                student.getId(),
                student.getName(),
                student.getTechnologies(),
                student.getCourses(),
                student.getRol(),
                student.getLinkedin()
        );
    }

    //* Convierte otro StudentDTO a la entidad Student.
    public static Student toEntity(StudentDTO studentDTO) {
        return Student.builder()
                .id(studentDTO.id())
                .name(studentDTO.name())
                .technologies(studentDTO.skills())
                .courses(studentDTO.courses())
                .rol(studentDTO.profiles())
                .linkedin(studentDTO.linkedin())
                .build();
    }

    //* Convierte este StudentDTO a la entidad Student usando sus propios datos.
    public Student toEntity() {
        return Student.builder()
                .id(this.id())
                .name(this.name())
                .technologies(this.skills())
                .courses(this.courses())
                .rol(this.profiles())
                .linkedin(this.linkedin())
                .build();
    }
}
