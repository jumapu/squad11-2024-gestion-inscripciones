package com.PoloIT.GestionDeInscripciones.Services;

import lombok.*;
import lombok.experimental.FieldNameConstants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Value("${mail}")
    private String userEmailEjemplo;
//[4/9] traigo las configuracione del remitente del email

    private final JavaMailSender emailSender;
//creo el contructor por que al usar @AllArgsConstructor me crea una instancia de userEmailEjemplo mas que y no me permite tomar el valor de aplication.yml con @Value
    public EmailService(JavaMailSender emailSender) {
        this.emailSender = emailSender;
    }

    //[6/9] creo el email y lo envio
    public void sendEmail(String to, String subject, String text) {
        // Create a new email message
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(userEmailEjemplo ); // Sender's email address
        message.setTo(to); // Recipient's email address
        message.setSubject(subject); // Email subject
        message.setText(text); // Email body
        // Send the email
        emailSender.send(message);
    }
}