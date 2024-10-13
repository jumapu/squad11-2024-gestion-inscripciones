package com.PoloIT.GestionDeInscripciones.DTO;

import com.PoloIT.GestionDeInscripciones.Entity.Student;
import jakarta.validation.constraints.NotNull;

import java.util.Set;

public record StudentDTO(
        Long id,
        @NotNull(message = "name requerido")
        String name,
        String img,
        @NotNull(message = "lastname requerido")
        String lastName,
        @NotNull(message = "rol requerido")
        Set<String> rol

) {

    public StudentDTO(Student student) {
        this(
                student.getId(),
                student.getName(),
                student.getImgUrl(),
                student.getLastName(),
                student.getRol()
        );
    }

    public static Student fromStudent(StudentDTO studentDTO) {
        return Student.builder()
                .id(studentDTO.id)
                .name(studentDTO.name)
                .imgUrl(studentDTO.img)
                .rol(studentDTO.rol)
                .lastName(studentDTO.lastName)
                .build();
    }

    public Student convertStudent() {
        return Student.builder()
                .id(this.id)
                .name(this.name)
                .imgUrl(this.img)
                .rol(this.rol)
                .lastName(this.lastName)
                .build();
    }
}
