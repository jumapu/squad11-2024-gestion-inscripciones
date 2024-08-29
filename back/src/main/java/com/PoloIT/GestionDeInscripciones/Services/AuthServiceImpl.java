package com.PoloIT.GestionDeInscripciones.Services;


import com.PoloIT.GestionDeInscripciones.Config.ExecptionControll.ResponseException;
import com.PoloIT.GestionDeInscripciones.DTO.UserDto;
import com.PoloIT.GestionDeInscripciones.Entity.Admin;
import com.PoloIT.GestionDeInscripciones.Entity.Mentor;
import com.PoloIT.GestionDeInscripciones.Entity.Student;
import com.PoloIT.GestionDeInscripciones.Entity.User;
import com.PoloIT.GestionDeInscripciones.Enums.Rol;
import com.PoloIT.GestionDeInscripciones.Jwt.JwtService;
import com.PoloIT.GestionDeInscripciones.Repository.AdminRepository;
import com.PoloIT.GestionDeInscripciones.Repository.MentorRepository;
import com.PoloIT.GestionDeInscripciones.Repository.StudentRepository;
import com.PoloIT.GestionDeInscripciones.Repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

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
    private final ModelMapper mapper;
    private final JwtService jwtService;

    public String authenticate(UserDto userDto) {
        authenticationAccount(userDto);
        return jwtService.generateJwt(userDto.getEmail());
    }

    public String register(UserDto userDto) {
        emailInUsed(userDto);
        setRol(userRepository.save(toUser(userDto)), userDto);
        return jwtService.generateJwt(userDto.getEmail());
    }


    private void authenticationAccount(UserDto userDto) {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                    userDto.getEmail(),
                    userDto.getPassword()
            ));
        } catch (Exception e) {
            System.out.println(e.getLocalizedMessage());
            if (e.getLocalizedMessage().equals("Bad credentials"))
                throw new ResponseException("404", "Incorrect password", HttpStatus.NOT_FOUND);
            if (e.getLocalizedMessage().equals("Email not Found"))
                throw new ResponseException("404", "Email not Found", HttpStatus.NOT_FOUND);
            throw new ResponseException("404", "Error Credentials", HttpStatus.NOT_FOUND);
        }
    }

    private void emailInUsed(UserDto userDto) {
        if (Objects.isNull(userDto.getName()))
            throw new ResponseException("404", "Name required", HttpStatus.NOT_FOUND);

        //! se puede limitar los admin
//        if (userRepository.countAdmins() >= 4) {
//            throw new ResponseException("404", "No more admins can register!", HttpStatus.NOT_ACCEPTABLE);
//        }


        if (userRepository.findByEmail(userDto.getEmail()).isPresent())
            throw new ResponseException("404", "Email in used", HttpStatus.NOT_ACCEPTABLE);
    }

    private User toUser(UserDto userDto) {
        checkRol(userDto);
        userDto.setPassword(encoder.encode(userDto.getPassword()));
        userDto.setRol(userDto.getRol().toUpperCase());
        return mapper.map(userDto, User.class);
    }

    private void checkRol(UserDto userDto) {
        Rol.fromString(userDto.getRol());
    }

    private void setRol(User user, UserDto userDto) {

        if (user.getRol().name().equalsIgnoreCase("admin")) {
            adminRepository.save(
                    Admin.builder()
                            .name(userDto.getName())
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
        
    }

    public void applyNewPassword(ResetPasswordDTO resetPasswordDTO, String token) {
    }
}
