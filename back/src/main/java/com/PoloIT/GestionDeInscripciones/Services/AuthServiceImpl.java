package com.PoloIT.GestionDeInscripciones.Services;


import com.PoloIT.GestionDeInscripciones.Config.ExecptionControll.ResponseException;
import com.PoloIT.GestionDeInscripciones.DTO.UserDto;
import com.PoloIT.GestionDeInscripciones.Entity.Admin;
import com.PoloIT.GestionDeInscripciones.Entity.User;
import com.PoloIT.GestionDeInscripciones.Enums.Rol;
import com.PoloIT.GestionDeInscripciones.Jwt.JwtService;
import com.PoloIT.GestionDeInscripciones.Repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder encoder;
    private final ModelMapper mapper;
    private final JwtService jwtService;
    private final UserRepository userRepository;


    public String authenticate(UserDto userDto) {
        authenticationAccount(userDto);
        return jwtService.generateJwt(userDto.getEmail());
    }

    public String register(UserDto userDto) {

        emailInUsed(userDto);
        userRepository.save(toUser(userDto));
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
        if (userRepository.findByEmail(userDto.getEmail()).isPresent())
            throw new ResponseException("404", "Email in used", HttpStatus.NOT_ACCEPTABLE);
    }

    private User toUser(UserDto userDto) {
        checkRol(userDto);
        userDto.setPassword(encoder.encode(userDto.getPassword()));
        userDto.setRol(userDto.getRol().toUpperCase());
        return mapper.map(userDto, User.class);
    }

    private Admin getAdminContext() {
        return userRepository.findByEmail(
                        SecurityContextHolder.getContext().getAuthentication().getName()).
                map(User::getAdmin).
                orElseThrow(() -> new ResponseException("404", "Admin", HttpStatus.NOT_FOUND));
    }

    private void checkRol(UserDto userDto) {
        Rol.fromString(userDto.getRol());
    }
}
