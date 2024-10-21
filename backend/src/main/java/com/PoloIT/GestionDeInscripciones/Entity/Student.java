package com.PoloIT.GestionDeInscripciones.Entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.Objects;
import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Setter
@Getter
public class Student {

    @Id
    private Long id;

    @OneToOne
    @MapsId
    @JoinColumn(name = "user_id")
    private User user;
    private String name;
    private String lastName;
    private Set<String> rol;
    private String imgUrl;
    private String ong;

    //*Registration
    @ManyToMany(mappedBy = "students")
    private Set<Registration> registrations;

    //*TEAMS
    @ManyToMany(mappedBy = "students")
    private Set<Team> team;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Student student = (Student) o;
        return Objects.equals(id, student.id) && Objects.equals(user, student.user) && Objects.equals(name, student.name) && Objects.equals(lastName, student.lastName) && Objects.equals(rol, student.rol);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, user, name, lastName, rol);
    }
}
