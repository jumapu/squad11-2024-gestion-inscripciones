package com.PoloIT.GestionDeInscripciones.Services;

import com.PoloIT.GestionDeInscripciones.Entity.User;
import java.util.List;
import java.util.Optional;

public interface UserService {

    Optional<User> findById(Long id);

    User save(User user);

    Optional<User> findByEmail(String email);

    List<User> findAll();

    public void delete(Long id);

    public Optional<User> get(Long id);

}
