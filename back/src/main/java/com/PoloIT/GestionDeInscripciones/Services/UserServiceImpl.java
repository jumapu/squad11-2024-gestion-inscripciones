package com.PoloIT.GestionDeInscripciones.Services;

import com.PoloIT.GestionDeInscripciones.Config.ExecptionControll.ResponseException;
import com.PoloIT.GestionDeInscripciones.DTO.password.UpdatePasswordDTO;
import com.PoloIT.GestionDeInscripciones.Entity.User;
import com.PoloIT.GestionDeInscripciones.Repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements IUserServiceIpml {

    private final UserRepository userRepository;
    private final PasswordEncoder encoder;

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

    public void updatePassword(UpdatePasswordDTO updatePasswordDTO) {
        User user = this.getUserContext();
        if (!encoder.matches(updatePasswordDTO.oldPassword(), user.getPassword()))
            throw new ResponseException("401", "Incorrect old password", HttpStatus.UNAUTHORIZED);
        if (!updatePasswordDTO.confirmPassword().equals(updatePasswordDTO.newPassword()))
            throw new ResponseException("400", "Passwords do not match", HttpStatus.BAD_REQUEST);
        user.setPassword(encoder.encode(updatePasswordDTO.newPassword()));
    }
}
