package com.PoloIT.GestionDeInscripciones.Entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Setter
@Getter
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    @Size(max = 1000, message = "Description must not exceed 1000 characters")
    private String description;
    private String img;
    private String company;

    @Column(name = "is_active")
    @JsonProperty("isActive")
    private boolean isActive;

    private LocalDateTime createdAt;
    private LocalDateTime finishAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    //* RELATIONSHIP WITH REGISTRATION
    @OneToOne(mappedBy = "event", cascade = CascadeType.ALL, orphanRemoval = true)
    private Registration registration;

    //* RELATIONSHIP WITH TEAMS
    @OneToOne(mappedBy = "event", cascade = CascadeType.ALL, orphanRemoval = true)
    private TeamGroup teamGroup;

    //* RELATIONSHIP WITH ADMIN
    @ManyToOne()
    @JoinColumn(name = "admin_id")
    private Admin admin;

    public void deactivateEvent() {
        this.isActive = false;
    }
}
