package com.PoloIT.GestionDeInscripciones.Entity;

import com.PoloIT.GestionDeInscripciones.DTO.EventDTO.DataRegisterEvent;
import com.PoloIT.GestionDeInscripciones.DTO.EventDTO.DataUpdateEvent;
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

    //* RELATIONSHIP WITH TEAMS
    @OneToOne(mappedBy = "event")
    private Teams teams;

    //* RELATIONSHIP WITH ADMIN
    @ManyToOne()
    @JoinColumn(name = "admin_id")
    private Admin admin;

    @Column(name = "is_active")
    private boolean isActive = false;

    public Event(DataRegisterEvent datosRegistroEvent, Admin admin) {
        this.name = datosRegistroEvent.name();
        this.admin = admin;
    }

    public void updateEvent(DataUpdateEvent dataUpdateEvent) {
        this.name = dataUpdateEvent.name();
    }

    public void deactivateEvent() {
        this.isActive = false;
    }
}
