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

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class RegistrationServiceImpl {
    private final UserRepository userRepository;
    private final RegistraionRepository registraionRepository;

    public void register(Long id) {
        Registration registration = registraionRepository.findById(id)
                .map(this::setUserEvent)
                .orElseThrow(() -> new ResponseException("404", "ID NOT FOUND EVENT/REGISTRATION", HttpStatus.NOT_FOUND));

        registraionRepository.save(registration);
    }

    private void isActiveRegister(Registration registration) {
        if (registration.getFinishAt().isBefore(LocalDateTime.now()))
            throw new ResponseException("Event", "Registration ended on " + registration.getFinishAt(), HttpStatus.NOT_ACCEPTABLE);
    }

    private Registration setUserEvent(Registration registration) {
        isActiveRegister(registration);

        User user = getUserContext();

        isRegistered(user, registration);

        if (user.getRol().name().equalsIgnoreCase("mentor")) {
            registration.getMentors().add(user.getMentor());
            return registration;
        }

        if (user.getRol().name().equalsIgnoreCase("student")) {
            registration.getStudents().add(user.getStudent());
            return registration;
        }

        throw new ResponseException("505", "INTERNAL SERVER ERROR", HttpStatus.INTERNAL_SERVER_ERROR);
    }


    private void isRegistered(User user, Registration registration) {
        if (user.getRol().name().equalsIgnoreCase("student")) {
            if (registration.getStudents().stream().anyMatch(student -> student.getId().equals(user.getStudent().getId()))) {
                throw new ResponseException("200", "Already registered", HttpStatus.ACCEPTED);
            }
        }

        if (user.getRol().name().equalsIgnoreCase("mentor")) {
            if (registration.getMentors().stream().anyMatch(mentor -> mentor.getId().equals(user.getMentor().getId()))) {
                throw new ResponseException("200", "Already registered", HttpStatus.ACCEPTED);
            }
        }
    }


    private User getUserContext() {
        return userRepository.findByEmail(SecurityContextHolder.getContext().getAuthentication().getName())
                .orElseThrow(() -> new ResponseException("505", "Internal Server Error", HttpStatus.INTERNAL_SERVER_ERROR));
    }


}
