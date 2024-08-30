package com.PoloIT.GestionDeInscripciones.Services;


import com.PoloIT.GestionDeInscripciones.Config.ExecptionControll.ResponseException;
import com.PoloIT.GestionDeInscripciones.DTO.EmailResetPasswordDTO;
import com.PoloIT.GestionDeInscripciones.DTO.ResetPasswordDTO;
import com.PoloIT.GestionDeInscripciones.DTO.UserDto;
import com.PoloIT.GestionDeInscripciones.Entity.Admin;
import com.PoloIT.GestionDeInscripciones.Entity.Mentor;
import com.PoloIT.GestionDeInscripciones.Entity.Student;
import com.PoloIT.GestionDeInscripciones.Entity.User;
import com.PoloIT.GestionDeInscripciones.Jwt.JwtService;
import com.PoloIT.GestionDeInscripciones.Repository.AdminRepository;
import com.PoloIT.GestionDeInscripciones.Repository.MentorRepository;
import com.PoloIT.GestionDeInscripciones.Repository.StudentRepository;
import com.PoloIT.GestionDeInscripciones.Repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final AdminRepository adminRepository;
    private final StudentRepository studentRepository;
    private final MentorRepository mentorRepository;
    private final PasswordEncoder encoder;
    private final JwtService jwtService;
    private final EmailService emailService;
    private final UserServiceImpl userService;

    public Map<String, String> authenticate(UserDto userDto) {
        String rol = authenticationAccount(userDto);
        return Map.of("jwt", jwtService.generateJwt(userDto.email()), "rol", rol);
    }

    public Map<String, String> register(UserDto userDto) {
        User user = userRepository.save(fromUser(userDto));
        setRol(user, userDto);
        return Map.of("JWT", jwtService.generateJwt(userDto.email()), "rol", userDto.rol());

    }


    private String authenticationAccount(UserDto userDto) {
        try {
            Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                    userDto.email(),
                    userDto.password()
            ));
            return authentication.getAuthorities().stream().findFirst().get().toString().toLowerCase();
        } catch (Exception e) {
            if (e.getLocalizedMessage().equals("Bad credentials"))
                throw new ResponseException("404", "Incorrect password", HttpStatus.NOT_FOUND);
            if (e.getLocalizedMessage().equals("Email not Found"))
                throw new ResponseException("404", "Email not Found", HttpStatus.NOT_FOUND);
            throw new ResponseException("404", "Error Credentials", HttpStatus.NOT_FOUND);
        }
    }

    private void emailInUsed(UserDto userDto) {
        if (Objects.isNull(userDto.email()))
            throw new ResponseException("404", "Name required", HttpStatus.NOT_FOUND);

        //! se puede limitar los admin
//        if (userRepository.countAdmins() >= 4) {
//            throw new ResponseException("404", "No more admins can register!", HttpStatus.NOT_ACCEPTABLE);
//        }


        if (userRepository.findByEmail(userDto.email()).isPresent())
            throw new ResponseException("404", "Email in used", HttpStatus.NOT_ACCEPTABLE);
    }

    private User fromUser(UserDto userDto) {
        emailInUsed(userDto);
        User user = UserDto.fromUser(userDto);
        user.setPassword(encoder.encode(user.getPassword()));
        return user;
    }

    private void setRol(User user, UserDto userDto) {

        if (user.getRol().name().equalsIgnoreCase("admin")) {
            adminRepository.save(
                    Admin.builder()
                            .name(userDto.name())
                            .user(user)
                            .build());
            return;
        }

        if (user.getRol().name().equalsIgnoreCase("mentor")) {
            mentorRepository.save(Mentor.builder()
                    .user(user).build());
            return;
        }

        if (user.getRol().name().equalsIgnoreCase("student")) {
            studentRepository.save(Student.builder()
                    .user(user).build());
            return;
        }

        throw new ResponseException("505", "internal server error", HttpStatus.INTERNAL_SERVER_ERROR);
    }
//[3/9] traigo el usuario de la BD y creo los datos del email
    public void sendPasswordResetLink(EmailResetPasswordDTO emailResetPasswordDTO) {
//        el mensaje de exception no deveria ser no found?
        User user = userRepository.findByEmail(emailResetPasswordDTO.email())
//                por que se validaria el rol?
//                .map(user1 -> {
//                    isValidRol(user1.getRol());
//                    return user1;
//                })
                .orElseThrow(() -> new ResponseException("404", "Email in used", HttpStatus.NOT_ACCEPTABLE));
        emailService.sendEmail(
                user.getEmail(),
                "prueba para reset password",
                jwtService.generateJwt(user.getEmail())
        );
    }
//[9/9] verifico que las contraseña y la guardo en la DB
    public void applyNewPassword(ResetPasswordDTO resetPasswordDTO) {
//pase el metodo de isPasswordsMatch() directamente al parametro.
        if (!resetPasswordDTO.confirmPassword().equals(resetPasswordDTO.password()))
            throw new ResponseException("400", "Passwords do not match", HttpStatus.BAD_REQUEST);
        userService.getUserContext().resetPassword(encoder.encode(resetPasswordDTO.password()));
    }
}
