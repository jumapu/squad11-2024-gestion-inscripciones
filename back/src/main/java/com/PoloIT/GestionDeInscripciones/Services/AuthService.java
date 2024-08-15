package com.PoloIT.GestionDeInscripciones.Services;

import com.PoloIT.GestionDeInscripciones.DTO.UserDto;

public interface AuthService {

    String authenticate(UserDto userDto);

    String register(UserDto userDto);
}