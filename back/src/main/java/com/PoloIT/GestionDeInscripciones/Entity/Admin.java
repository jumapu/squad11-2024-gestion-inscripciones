package com.PoloIT.GestionDeInscripciones.Entity;


import jakarta.persistence.*;
import lombok.*;

import java.util.Objects;
import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Setter
@Getter
@Entity
public class Admin {
    @Id
    private Long id;

    @OneToOne
    @MapsId
    @JoinColumn(name = "user_id")
    private User user;
    private String name;
    private String lastName;

    @OneToMany(mappedBy = "admin", cascade = CascadeType.ALL)
    private Set<Event> events;


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
