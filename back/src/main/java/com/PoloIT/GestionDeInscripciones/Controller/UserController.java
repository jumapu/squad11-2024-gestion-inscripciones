package com.PoloIT.GestionDeInscripciones.Controller;

import com.PoloIT.GestionDeInscripciones.Entity.User;
import com.PoloIT.GestionDeInscripciones.Enums.Rol;
import com.PoloIT.GestionDeInscripciones.Services.UserService;
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
@RequestMapping("/user")
@CrossOrigin("*") //Agregar la ruta del front
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/saveuser")
    public User saveUser(@RequestBody User user) throws Exception {

        user.setEmail(user.getEmail());
        user.setPassword(user.getPassword());
        user.setRol(Rol.STUDENT);

        return userService.save(user);
    }

    @GetMapping("/{username}")
    public Optional<User> getUsuario(@PathVariable("email") String email) {
        return userService.findByEmail(email);
    }

    @DeleteMapping("/{Id}")
    public void eliminarUsuario(@PathVariable("usuarioId") Long Id) {
        userService.delete(Id);
    }
}
