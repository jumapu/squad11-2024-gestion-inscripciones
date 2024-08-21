package com.PoloIT.GestionDeInscripciones.DTO.mentor;

import com.PoloIT.GestionDeInscripciones.Entity.Mentor;

public record DataResponseMentor(Long id,String email,String name) {
    public DataResponseMentor(Mentor mentor) {
        this(mentor.getUser().getId(),mentor.getUser().getEmail(),mentor.getName());
    }
}
