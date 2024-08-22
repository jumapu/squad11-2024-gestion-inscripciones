package com.PoloIT.GestionDeInscripciones.Entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.HashSet;
import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Setter
@Getter
@Entity
public class Team {

    @ManyToMany
    @JoinTable(
            name = "team_students",
            joinColumns = @JoinColumn(name = "team_id"),
            inverseJoinColumns = @JoinColumn(name = "student_id")
    )
    private final Set<Student> students = new HashSet<>();
    @ManyToMany
    @JoinTable(
            name = "team_mentors",
            joinColumns = @JoinColumn(name = "team_id"),
            inverseJoinColumns = @JoinColumn(name = "mentor_id")
    )
    private final Set<Mentor> mentors = new HashSet<>();
    @ManyToOne()
    @JoinColumn(name = "teamgroup_id")
    private TeamGroup teamGroup;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

}
