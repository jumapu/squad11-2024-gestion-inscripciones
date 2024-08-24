
package com.PoloIT.GestionDeInscripciones.Services;

import com.PoloIT.GestionDeInscripciones.Entity.Mentor;
import java.util.List;
import java.util.Optional;


public interface MentorService {
    
    Optional<Mentor> findById(Long id);

    Mentor save(Mentor mentor);

    Optional<Mentor> findByEmail(String email);

    List<Mentor> findAll();

    public void delete(Long id);

    public Optional<Mentor> get(Long id);
    
}
