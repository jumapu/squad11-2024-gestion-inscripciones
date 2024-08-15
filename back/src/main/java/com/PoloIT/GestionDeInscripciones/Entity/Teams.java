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
public class Teams {
    @Id
    @OneToOne
    @MapsId
    @JoinColumn(name = "event_id")
    private Event event;

    private int groupLimit;
    private int participantsByGroups;

    @ManyToMany
    @JoinTable(
            name = "team_students",
            joinColumns = @JoinColumn(name = "team_id"),
            inverseJoinColumns = @JoinColumn(name = "student_id")
    )
    private Set<Student> students = new HashSet<>();

    @ManyToMany
    @JoinTable(
            name = "team_mentors",
            joinColumns = @JoinColumn(name = "team_id"),
            inverseJoinColumns = @JoinColumn(name = "mentor_id")
    )
    private Set<Mentor> mentors = new HashSet<>();

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Teams teams = (Teams) o;
        return Objects.equals(event.getId(), teams.event.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hash(event.getId());
    }
}
