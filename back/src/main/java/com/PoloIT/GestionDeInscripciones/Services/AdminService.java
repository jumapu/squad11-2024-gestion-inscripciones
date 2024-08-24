package com.PoloIT.GestionDeInscripciones.Services;

import com.PoloIT.GestionDeInscripciones.Entity.Admin;
import java.util.List;
import java.util.Optional;

public interface AdminService {

    Optional<Admin> findById(Long id);

    Admin save(Admin admin);

    Optional<Admin> findByEmail(String email);

    List<Admin> findAll();

    public void delete(Long id);

    public Optional<Admin> get(Long id);

}
