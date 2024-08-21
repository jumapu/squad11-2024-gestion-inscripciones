package com.PoloIT.GestionDeInscripciones.Services;

import com.PoloIT.GestionDeInscripciones.Config.ExecptionControll.ResponseException;
import com.PoloIT.GestionDeInscripciones.Entity.Registration;
import com.PoloIT.GestionDeInscripciones.Entity.User;
import com.PoloIT.GestionDeInscripciones.Repository.RegistraionRepository;
import com.PoloIT.GestionDeInscripciones.Repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RegistrationServiceImpl {
    private final UserRepository userRepository;
    private final RegistraionRepository registraionRepository;

    private Registration registerUserEvent(Registration registration) {
        User user = getUserContext();
        isRegistered(user, registration);

        //! Verificamos si student  o mentor están vacíos sin información.
        //! Se requiere que ambos perfiles estén completos para luego crear los grupos.

        if (user.getRol().name().equalsIgnoreCase("mentor")) {
            if (user.getMentor().areFieldsValid()) {
                registration.getMentors().add(user.getMentor());
                return registration;
            }
            throw new ResponseException("Information", "Complete Mentor information", HttpStatus.NOT_ACCEPTABLE);
        }

        if (user.getRol().name().equalsIgnoreCase("student")) {
            if (user.getStudent().areFieldsValid()) {
                registration.getStudents().add(user.getStudent());
                return registration;
            }
            throw new ResponseException("Information", "Complete Student information", HttpStatus.NOT_ACCEPTABLE);
        }

        throw new ResponseException("505", "INTERNAL SERVER ERROR", HttpStatus.INTERNAL_SERVER_ERROR);
    }

    public void registerEvent(Long id) {
        Registration registration = registraionRepository.findById(id)
                .map(this::registerUserEvent)
                .orElseThrow(() -> new ResponseException("404", "ID NOT FOUND EVENT/REGISTRATION", HttpStatus.NOT_FOUND));
        registraionRepository.save(registration);
    }


    private void isRegistered(User user, Registration registration) {
        //! verificamos si ya esta registrado en el evento, si lo esta devuelve un mensaje.
        //! No se registraria ya que se usa un SET. Solo le informamos al front.
        if (registration.getStudents().stream().anyMatch(student -> student.getId().equals(user.getStudent().getId()))) {
            throw new ResponseException("200", "Already registered", HttpStatus.ACCEPTED);
        }

        if (registration.getMentors().stream().anyMatch(mentor -> mentor.getId().equals(user.getMentor().getId()))) {
            throw new ResponseException("200", "Already registered", HttpStatus.ACCEPTED);
        }
    }

    private User getUserContext() {
        return userRepository.findByEmail(
                        SecurityContextHolder.getContext().getAuthentication().getName()
                )
//                .map(User::getAdmin)
                .orElseThrow(() -> new ResponseException("505", "Internal Server Error", HttpStatus.INTERNAL_SERVER_ERROR));
    }


}
