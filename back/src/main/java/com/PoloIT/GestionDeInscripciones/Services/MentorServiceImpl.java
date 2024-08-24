package com.PoloIT.GestionDeInscripciones.Services;

import com.PoloIT.GestionDeInscripciones.Entity.Mentor;
import com.PoloIT.GestionDeInscripciones.Repository.MentorRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MentorServiceImpl implements MentorService {

    @Autowired
    private MentorRepository mentorRepository;

    @Override
    public Optional<Mentor> findById(Long id) {

        return mentorRepository.findById(id);
    }

    @Override
    public Mentor save(Mentor mentor) {

        return mentorRepository.save(mentor);
    }

    @Override
    public Optional<Mentor> findByEmail(String email) {

        return mentorRepository.findByEmail(email);
    }

    @Override
    public List<Mentor> findAll() {

        return mentorRepository.findAll();
    }

    @Override
    public void delete(Long id) {

        mentorRepository.deleteById(id);
    }

    @Override
    public Optional<Mentor> get(Long id) {

        return mentorRepository.findById(id);
    }

}
