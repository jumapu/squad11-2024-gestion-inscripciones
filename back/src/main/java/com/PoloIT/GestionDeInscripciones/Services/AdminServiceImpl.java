package com.PoloIT.GestionDeInscripciones.Services;

import com.PoloIT.GestionDeInscripciones.Entity.Admin;
import com.PoloIT.GestionDeInscripciones.Repository.AdminRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdminServiceImpl implements AdminService {

    @Autowired
    private AdminRepository adminRepository;

    @Override
    public Optional<Admin> findById(Long id) {

        return adminRepository.findById(id);
    }

    @Override
    public Admin save(Admin admin) {

        return adminRepository.save(admin);
    }

    @Override
    public Optional<Admin> findByEmail(String email) {
        
        return adminRepository.findByEmail(email);
    }

    @Override
    public List<Admin> findAll() {
        
        return adminRepository.findAll();
    }

    @Override
    public void delete(Long id) {
        
        adminRepository.deleteById(id);
    }

    @Override
    public Optional<Admin> get(Long id) {
        
        return adminRepository.findById(id);
    }
}
