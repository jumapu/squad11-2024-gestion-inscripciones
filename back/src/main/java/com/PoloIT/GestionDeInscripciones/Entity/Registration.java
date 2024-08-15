package com.PoloIT.GestionDeInscripciones.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class Registration {

    @Id
    @OneToOne
    @MapsId
    @JoinColumn(name = "event_id")
    private Event event;


    @ManyToMany
    @JoinTable(
            name = "registration_mentors",
            joinColumns = @JoinColumn(name = "registration_id"),
            inverseJoinColumns = @JoinColumn(name = "mentor_id")
    )
    private Set<Mentor> mentors = new HashSet<>();

    @ManyToMany
    @JoinTable(
            name = "registration_students",
            joinColumns = @JoinColumn(name = "registration_id"),
            inverseJoinColumns = @JoinColumn(name = "student_id")
    )
    private Set<Student> students = new HashSet<>();

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Registration that = (Registration) o;
        return Objects.equals(event.getId(), that.event.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hash(event.getId());
    }
}
