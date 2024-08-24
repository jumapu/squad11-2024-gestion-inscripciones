
package com.PoloIT.GestionDeInscripciones.Services;

import com.PoloIT.GestionDeInscripciones.Entity.Student;
import com.PoloIT.GestionDeInscripciones.Repository.StudentRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class StudentServiceImpl implements StudentService {
    
    @Autowired
    private StudentRepository studentRepository;

    @Override
    public Optional<Student> findById(Long id) {
        
        return studentRepository.findById(id);
    }

    @Override
    public Student save(Student student) {
        
        return studentRepository.save(student);
    }

    @Override
    public Optional<Student> findByEmail(String email) {
        
        return studentRepository.findByEmail(email);
    }

    @Override
    public List<Student> findAll() {
       
        return studentRepository.findAll();
    }

    @Override
    public void delete(Long id) {
        
        studentRepository.deleteById(id);
    }

    @Override
    public Optional<Student> get(Long id) {
        
        return studentRepository.findById(id);
    }
    
}
