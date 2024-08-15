package com.PoloIT.GestionDeInscripciones.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Entity
@Setter
@Getter
public class Mentor {

    @Id
    @OneToOne
    @MapsId
    @JoinColumn(name = "user_id")
    private User user;

    //*Registration
    @ManyToMany(mappedBy = "mentors")
    private Set<Registration> registrations = new HashSet<>();


    //*TEAMS
    @ManyToMany(mappedBy = "mentors")
    private Set<Teams> teams = new HashSet<>();

    private String name;
    private String company;
    private Set<String> skills;
    private Set<String> profiles;
    private String linkedin;

}
