package com.PoloIT.GestionDeInscripciones.Services;

import com.PoloIT.GestionDeInscripciones.Config.ExecptionControll.ResponseException;
import com.PoloIT.GestionDeInscripciones.DTO.MentorDTO;
import com.PoloIT.GestionDeInscripciones.Entity.Mentor;
import com.PoloIT.GestionDeInscripciones.Entity.User;
import com.PoloIT.GestionDeInscripciones.Repository.MentorRepository;
import com.PoloIT.GestionDeInscripciones.Repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
@RequiredArgsConstructor
public class MentorServiceImpl {
    private final UserRepository userRepository;
    private final MentorRepository mentorRepository;
    private final UserServiceImpl userService;

    public void update(MentorDTO mentorDTO) {
        mentorRepository.save(dateUpdate(mentorDTO));
    }

    private Mentor dateUpdate(MentorDTO mentorDTO) {
        if (Objects.isNull(mentorDTO.id()))
            throw new ResponseException("404", "Id requerido", HttpStatus.NOT_FOUND);

        Mentor mentor = MentorDTO.fromMentor(mentorDTO);

        mentor.setId(userService.getUserRolContext(Mentor.class).getId());
        return mentor;
    }

    public MentorDTO getById(Long id) {
        return mentorRepository.findById(id).map(MentorDTO::new)
                .orElseThrow(() -> new ResponseException("404", "Mentor not Fount", HttpStatus.NOT_FOUND));
    }

    public void delete() {
        userService.getUserContext().setDelete(true);
    }
}
