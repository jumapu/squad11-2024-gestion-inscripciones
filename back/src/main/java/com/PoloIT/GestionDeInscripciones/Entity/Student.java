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
    private Set<String> technologies;
    private Set<String> courses;
    private String linkedin;

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
        return user != null && user.getId() != null &&
                user.getId().equals(student.user != null ? student.user.getId() : null);
    }

    @Override
    public int hashCode() {
        return user != null && user.getId() != null ? Objects.hash(user.getId()) : 0;
    }


}
