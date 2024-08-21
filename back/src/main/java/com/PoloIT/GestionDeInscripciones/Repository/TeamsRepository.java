package com.PoloIT.GestionDeInscripciones.Repository;

import com.PoloIT.GestionDeInscripciones.Entity.TeamGroup;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TeamsRepository extends JpaRepository<TeamGroup, Long> {
}
