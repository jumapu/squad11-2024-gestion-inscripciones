
package com.PoloIT.GestionDeInscripciones.Services;

import com.PoloIT.GestionDeInscripciones.Entity.Student;
import java.util.List;
import java.util.Optional;

public interface StudentService {
    
     Optional<Student> findById(Long id);

    Student save(Student student);

    Optional<Student> findByEmail(String email);

    List<Student> findAll();

    public void delete(Long id);

    public Optional<Student> get(Long id);
    
}
