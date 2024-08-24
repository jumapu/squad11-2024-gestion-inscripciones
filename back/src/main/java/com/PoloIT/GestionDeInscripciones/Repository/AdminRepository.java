package com.PoloIT.GestionDeInscripciones.Repository;

import com.PoloIT.GestionDeInscripciones.Entity.Admin;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdminRepository extends JpaRepository<Admin, Long> {

    Optional<Admin> findByEmail(String email);
    
}
