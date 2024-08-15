package com.PoloIT.GestionDeInscripciones.Entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@Entity
public class Admin {
    @Id
    @OneToOne
    @MapsId
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany(mappedBy = "admin")
    private Set<Event> events = new HashSet<>();


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Admin admin = (Admin) o;
        return user != null && user.getId() != null &&
                user.getId().equals(admin.user != null ? admin.user.getId() : null);
    }

    @Override
    public int hashCode() {
        return user != null && user.getId() != null ? Objects.hash(user.getId()) : 0;
    }
}
