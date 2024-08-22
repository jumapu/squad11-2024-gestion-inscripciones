package com.PoloIT.GestionDeInscripciones.Entity;

import com.PoloIT.GestionDeInscripciones.DTO.event.DataRegisterEvent;
import com.PoloIT.GestionDeInscripciones.DTO.event.DataUpdateEvent;
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

    @Column(unique = false)
    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    //* RELATIONSHIP WITH REGISTRATION
    @OneToOne(mappedBy = "event", cascade = CascadeType.ALL)
    private Registration registration;

    //* RELATIONSHIP WITH TEAMS
    @OneToOne(mappedBy = "event")
    private TeamGroup teamGroup;

    //* RELATIONSHIP WITH ADMIN
    @ManyToOne()
    @JoinColumn(name = "admin_id")
    private Admin admin;

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
