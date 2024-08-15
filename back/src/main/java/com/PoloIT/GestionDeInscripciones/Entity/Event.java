package com.PoloIT.GestionDeInscripciones.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Entity
@Setter
@Getter
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;

    @Column(unique = false)
    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    //* RELATIONSHIP WITH REGISTRATION
    @OneToOne(mappedBy = "event")
    private Registration registration;

    //* RELATIONSHIP WITH REGISTRATION
    @OneToOne(mappedBy = "event")
    private Teams teams;

    //* RELATIONSHIP WITH ADMIN
    @ManyToOne()
    @JoinColumn(name = "admin_id")
    private Admin admin;
}
