package com.PoloIT.GestionDeInscripciones.Entity;

import com.PoloIT.GestionDeInscripciones.DTO.EventDTO;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
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
    private String description;

    @Column(name = "is_active")
    private boolean isActive;

    @CreationTimestamp
    private LocalDateTime createdAt;
    @UpdateTimestamp
    private LocalDateTime finishAt;

    //* RELATIONSHIP WITH REGISTRATION
    @OneToOne(mappedBy = "event", cascade = CascadeType.ALL)
    private Registration registration;

    //* RELATIONSHIP WITH TEAMS
    @OneToOne(mappedBy = "event", cascade = CascadeType.ALL)
    private TeamGroup teamGroup;

    //* RELATIONSHIP WITH ADMIN
    @ManyToOne()
    @JoinColumn(name = "admin_id")
    private Admin admin;

    public Event(EventDTO eventDTO, Admin admin) {
        this.name = eventDTO.name();
        this.description = eventDTO.description();
        this.admin = admin;
    }


    public void update(EventDTO eventDTO) {
        this.name = eventDTO.name();
        this.description = eventDTO.description();
    }

    public void deactivateEvent() {
        this.isActive = false;
    }
}
