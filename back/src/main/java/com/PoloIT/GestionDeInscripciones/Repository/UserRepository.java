package com.PoloIT.GestionDeInscripciones.Repository;

import com.PoloIT.GestionDeInscripciones.Entity.User;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    @Query(value = "SELECT COUNT(*) FROM user WHERE rol = 'ADMIN'", nativeQuery = true)
    long countAdmins();

    @Transactional
    @Query(value = "UPDATE user Set name=:name where id=:id", nativeQuery = true)
    void patchName(@Param("name") String name, @Param("id") Long id);

}
