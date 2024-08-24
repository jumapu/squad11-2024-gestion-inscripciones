package com.PoloIT.GestionDeInscripciones.Controller;

import com.PoloIT.GestionDeInscripciones.Entity.Admin;
import com.PoloIT.GestionDeInscripciones.Services.AdminService;
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
@RequestMapping("/admin")
@CrossOrigin("*") //Agregar la ruta del front
public class AdminController {

    @Autowired
    private AdminService adminService;

    @PostMapping("/saveadmin")
    public Admin saveAdmin(@RequestBody Admin admin) throws Exception {

        admin.setUser(admin.getUser());
        admin.setName(admin.getName());
        admin.setLastName(admin.getLastName());
        admin.setEvents(admin.getEvents());

        return adminService.save(admin);
    }

    @GetMapping("/{username}")
    public Optional<Admin> getAdmin(@PathVariable("email") String email) {
        return adminService.findByEmail(email);
    }

    @DeleteMapping("/{Id}")
    public void deleteAdmin(@PathVariable("Id") Long Id) {
        adminService.delete(Id);
    }

}
