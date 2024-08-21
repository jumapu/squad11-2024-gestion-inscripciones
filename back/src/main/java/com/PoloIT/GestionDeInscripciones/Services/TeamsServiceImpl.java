package com.PoloIT.GestionDeInscripciones.Services;

import com.PoloIT.GestionDeInscripciones.Config.ExecptionControll.ResponseException;
import com.PoloIT.GestionDeInscripciones.DTO.TeamsDTO;
import com.PoloIT.GestionDeInscripciones.Entity.Registration;
import com.PoloIT.GestionDeInscripciones.Repository.RegistraionRepository;
import com.PoloIT.GestionDeInscripciones.Repository.TeamsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TeamsServiceImpl {
    private final TeamsRepository teamsRepository;
    private final RegistraionRepository registraionRepository;

    public void createTeams(TeamsDTO teamsDTO, Long id) {
        Registration registration = registraionRepository.findById(id)
                .orElseThrow(() -> new ResponseException("404", "ID NOT FOUND EVENT/REGISTRATION", HttpStatus.NOT_FOUND));


    }
}
