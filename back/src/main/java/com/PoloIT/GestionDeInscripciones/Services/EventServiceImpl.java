package com.PoloIT.GestionDeInscripciones.Services;

import com.PoloIT.GestionDeInscripciones.Config.ExecptionControll.ResponseException;
import com.PoloIT.GestionDeInscripciones.DTO.EventDTO;
import com.PoloIT.GestionDeInscripciones.Entity.Admin;
import com.PoloIT.GestionDeInscripciones.Entity.Event;
import com.PoloIT.GestionDeInscripciones.Entity.Registration;
import com.PoloIT.GestionDeInscripciones.Entity.User;
import com.PoloIT.GestionDeInscripciones.Repository.EventRepository;
import com.PoloIT.GestionDeInscripciones.Repository.RegistraionRepository;
import com.PoloIT.GestionDeInscripciones.Repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;


@Service
@RequiredArgsConstructor
public class EventServiceImpl {

    private final UserRepository userRepository;
    private final RegistraionRepository registraionRepository;
    private final EventRepository eventRepository;

    public void save(EventDTO eventDTO) {
        if (eventRepository.existsByName(eventDTO.name()))
            throw new ResponseException("Name", "Event NAME in used!", HttpStatus.NOT_ACCEPTABLE);

        Event event = Event.builder()
                .name(eventDTO.name())
                .registration(Registration.builder()
                        .finishAt(eventDTO.registration().finishAt())
                        .createdAt(eventDTO.registration().createdAt())
                        .build())
                .description(eventDTO.description())
                .createdAt(eventDTO.createdAt())
                .finishAt(eventDTO.finishAt())
                .isActive(true)
                .build();
        event.getRegistration().setEvent(event);
        eventRepository.save(event);
    }

    public void update(EventDTO eventDTO) {
        Event event = eventRepository.findById(eventDTO.id()).orElseThrow(() -> new ResponseException("404", "Not Found Event", HttpStatus.NOT_FOUND));
        event.update(eventDTO);
    }

    public void delete(Long id) {
        Event event = eventRepository.findById(id).orElseThrow(() -> new ResponseException("404", "Not Found Event", HttpStatus.NOT_FOUND));
        eventRepository.deleteById(id);
    }

    public EventDTO get(Long id) {
        return eventRepository.findById(id)
                .map(EventDTO::new)
                .orElseThrow(() -> new ResponseException("404", "Not Found Event", HttpStatus.NOT_FOUND));
    }

    public Map<String, List<EventDTO>> all() {
        List<EventDTO> list = eventRepository.findAll().stream()
                .map(EventDTO::new).toList();
        return Map.of("Events", list);
    }

    public Map<String, List<EventDTO>> AllActiveEvent() {
        return Map.of(
                "Events",
                all().get("Events").stream().filter(EventDTO::isActive).toList()
        );
    }

    public Map<String, List<EventDTO>> AllInactiveEvent() {
        return Map.of(
                "Events",
                all().get("Events").stream().filter(eventDTO -> !eventDTO.isActive()).toList()
        );
    }

    private Admin getAdminContext() {
        return userRepository.findByEmail(
                        SecurityContextHolder.getContext().getAuthentication().getName()
                )
                .map(User::getAdmin)
                .orElseThrow(() -> new ResponseException("505", "Internal Server Error", HttpStatus.INTERNAL_SERVER_ERROR));
    }

}
