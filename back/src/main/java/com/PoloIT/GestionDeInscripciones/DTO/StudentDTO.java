package com.PoloIT.GestionDeInscripciones.DTO;

import com.PoloIT.GestionDeInscripciones.Entity.Student;
import jakarta.validation.constraints.NotNull;

import java.util.Set;

public record StudentDTO(
        Long id,
        @NotNull(message = "name requerido")
        String name,
        @NotNull(message = "lastname requerido")
        String lastName,
        @NotNull(message = "technologies requerido")
        Set<String> technologies,
        @NotNull(message = "courses requerido")
        Set<String> courses,
        @NotNull(message = "rol requerido")
        Set<String> rol,
        @NotNull(message = "linkedin requerido")
        String linkedin
) {

    //* Constructor que convierte una entidad Student a StudentDTO.
    public StudentDTO(Student student) {
        this(
                student.getId(),
                student.getName(),
                student.getLastName(),
                student.getTechnologies(),
                student.getCourses(),
                student.getRol(),
                student.getLinkedin()
        );
    }

    public static Student fromStudent(StudentDTO studentDTO) {
        return Student.builder()
                .id(studentDTO.id)
                .name(studentDTO.name)
                .rol(studentDTO.rol)
                .technologies(studentDTO.technologies)
                .lastName(studentDTO.lastName)
                .courses(studentDTO.courses)
                .linkedin(studentDTO.linkedin)
                .build();
    }
}
