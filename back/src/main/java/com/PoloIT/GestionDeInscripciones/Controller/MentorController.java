
package com.PoloIT.GestionDeInscripciones.Controller;

import com.PoloIT.GestionDeInscripciones.Entity.Mentor;
import com.PoloIT.GestionDeInscripciones.Services.MentorService;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/mentor")
@CrossOrigin("*") //Agregar la ruta del front
public class MentorController {
    
     @Autowired
    private MentorService mentorService;

    @PostMapping("/savementor")
    public Mentor saveMentor(@RequestBody Mentor mentor) throws Exception {

        mentor.setUser(mentor.getUser());
        mentor.setLastName(mentor.getLastName());
        mentor.setLastName(mentor.getLastName());
        mentor.setCompany(mentor.getCompany());
        mentor.setSkills(mentor.getSkills());
        mentor.setProfiles(mentor.getProfiles());
        mentor.setLinkedin(mentor.getLinkedin());
        mentor.setRegistrations(mentor.getRegistrations());
        mentor.setTeam(mentor.getTeam());
        
        return mentorService.save(mentor);
    }

    @GetMapping("/{username}")
    public Optional<Mentor> getMentor(@PathVariable("email") String email) {
        return mentorService.findByEmail(email);
    }

    @DeleteMapping("/{Id}")
    public void deleteMentor(@PathVariable("Id") Long Id) {
        mentorService.delete(Id);
    }
    
}
