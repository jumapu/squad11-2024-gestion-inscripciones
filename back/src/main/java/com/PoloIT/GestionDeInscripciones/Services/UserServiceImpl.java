package com.PoloIT.GestionDeInscripciones.Services;

import com.PoloIT.GestionDeInscripciones.Config.ExecptionControll.ResponseException;
import com.PoloIT.GestionDeInscripciones.Entity.User;
import com.PoloIT.GestionDeInscripciones.Repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UserServiceImpl implements IUserServiceIpml {

    private final UserRepository userRepository;

    public <U> U getUserRolContext(Class<U> userRol) {
        User userContext = getUserContext();
        return switch (userContext.getRol()) {
            case ADMIN -> userRol.cast(userContext.getAdmin());
            case STUDENT -> userRol.cast(userContext.getStudent());
            case MENTOR -> userRol.cast(userContext.getMentor());
            default -> throw new ResponseException("403", "Forbidden", HttpStatus.FORBIDDEN);
        };
    }

    public User getUserContext() {
        return userRepository.findByEmail(
                        SecurityContextHolder.getContext().getAuthentication().getName())
                .orElseThrow(() -> new ResponseException("404", "User no Fount", HttpStatus.NOT_FOUND));
    }


    public void delete(Long id) {
        User user = userRepository.findById(id).orElseThrow(() -> new ResponseException("404", "Studen not Fount", HttpStatus.NOT_FOUND));
        if (user.isDelete())
            throw new ResponseException("403", "Student is deleted", HttpStatus.FORBIDDEN);
        user.setDelete(true);
    }
}
