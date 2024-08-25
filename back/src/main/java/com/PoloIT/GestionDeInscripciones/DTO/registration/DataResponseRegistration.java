package com.PoloIT.GestionDeInscripciones.DTO.registration;

import com.PoloIT.GestionDeInscripciones.DTO.mentor.DataResponseMentor;
import com.PoloIT.GestionDeInscripciones.DTO.student.DataResponseStudent;
import com.PoloIT.GestionDeInscripciones.Entity.Registration;

import java.util.Set;
import java.util.stream.Collectors;

public record DataResponseRegistration(Set<DataResponseStudent> Students,
                                       Set<DataResponseMentor> Mentors) {
    public DataResponseRegistration(Registration registration){
        this(registration.getStudents().stream().map(DataResponseStudent::new).collect(Collectors.toSet()),
                registration.getMentors().stream().map(DataResponseMentor::new).collect(Collectors.toSet()));
    }
}
