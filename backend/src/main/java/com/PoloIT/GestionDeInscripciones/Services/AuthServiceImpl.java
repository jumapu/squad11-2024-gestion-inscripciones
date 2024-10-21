package com.PoloIT.GestionDeInscripciones.Services;


import com.PoloIT.GestionDeInscripciones.Config.ExecptionControll.ResponseException;
import com.PoloIT.GestionDeInscripciones.DTO.EmailResetPasswordDTO;
import com.PoloIT.GestionDeInscripciones.DTO.UserDto;
import com.PoloIT.GestionDeInscripciones.DTO.password.ResetPasswordDTO;
import com.PoloIT.GestionDeInscripciones.Entity.Admin;
import com.PoloIT.GestionDeInscripciones.Entity.Mentor;
import com.PoloIT.GestionDeInscripciones.Entity.Student;
import com.PoloIT.GestionDeInscripciones.Entity.User;
import com.PoloIT.GestionDeInscripciones.Jwt.JwtService;
import com.PoloIT.GestionDeInscripciones.Repository.AdminRepository;
import com.PoloIT.GestionDeInscripciones.Repository.MentorRepository;
import com.PoloIT.GestionDeInscripciones.Repository.StudentRepository;
import com.PoloIT.GestionDeInscripciones.Repository.UserRepository;
import com.PoloIT.GestionDeInscripciones.Utils.EmailService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
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
        return authenticationAccount(userDto);
    }

    public Map<String, String> register(UserDto userDto) {
        User user = userRepository.save(fromUser(userDto));
        setRol(user, userDto);
        return Map.of("JWT", jwtService.generateJwt(userDto.email()), "rol", userDto.rol());

    }

    public Map<String, String> authenticationAccount(UserDto userDto) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            userDto.email(),
                            userDto.password()
                    )
            );

            User user = (User) authentication.getPrincipal();

            String jwt = jwtService.generateJwt(userDto.email());

            Map<String, String> response = new HashMap<>();
            response.put("rol", user.getRol().name().toLowerCase());
            response.put("jwt", jwt);
            user = userRepository.findByEmail(userDto.email()).orElse(null);
            response.put("id", user.getId().toString());
            return response;

        } catch (Exception e) {
            throw new ResponseException("404", "Credenciales incorrectas", HttpStatus.NOT_FOUND);
        }
    }


    private void emailInUsed(UserDto userDto) {
        if (Objects.isNull(userDto.email()))
            throw new ResponseException("404", "Name required", HttpStatus.NOT_FOUND);


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


    public void sendPasswordResetLink(EmailResetPasswordDTO emailResetPasswordDTO) {
        User user = userRepository.findByEmail(emailResetPasswordDTO.email())

                .orElseThrow(() -> new ResponseException("404", "Email in used", HttpStatus.NOT_ACCEPTABLE));
        emailService.sendEmail(
                user.getEmail(),
                "prueba para reset password",
                jwtService.tokenResetPassword(user.getEmail())
        );
    }


    public void applyNewPassword(ResetPasswordDTO resetPasswordDTO) {
        if (!resetPasswordDTO.confirmPassword().equals(resetPasswordDTO.password()))
            throw new ResponseException("400", "Passwords do not match", HttpStatus.BAD_REQUEST);

        userService.getUserContext().resetPassword(encoder.encode(resetPasswordDTO.password()));

    }

}
