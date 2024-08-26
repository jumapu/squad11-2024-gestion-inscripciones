package com.PoloIT.GestionDeInscripciones.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Objects;
import java.util.Set;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class TeamGroup {
    @Id
    private Long id;

    @OneToOne
    @MapsId
    @JoinColumn(name = "event_id")
    private Event event;


    @OneToMany(mappedBy = "teamGroup")
    private Set<Team> teams;


    //! agregar una lista de los que no quedaron.

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        TeamGroup teamGroup = (TeamGroup) o;
        return Objects.equals(event.getId(), teamGroup.event.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hash(event.getId());
    }
}
