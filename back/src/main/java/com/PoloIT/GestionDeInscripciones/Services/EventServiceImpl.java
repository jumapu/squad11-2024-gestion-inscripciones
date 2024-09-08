package com.PoloIT.GestionDeInscripciones.Services;

import com.PoloIT.GestionDeInscripciones.Config.ExecptionControll.ResponseException;
import com.PoloIT.GestionDeInscripciones.DTO.EventDTO;
import com.PoloIT.GestionDeInscripciones.Entity.Admin;
import com.PoloIT.GestionDeInscripciones.Entity.Event;
import com.PoloIT.GestionDeInscripciones.Entity.User;
import com.PoloIT.GestionDeInscripciones.Repository.EventRepository;
import com.PoloIT.GestionDeInscripciones.Repository.UserRepository;
import com.PoloIT.GestionDeInscripciones.Utils.FileEventServices;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;


@Service
@RequiredArgsConstructor
@Slf4j
public class EventServiceImpl {

    private final UserRepository userRepository;
    private final EventRepository eventRepository;
    private final FileEventServices fileEventServices;
    private final ObjectMapper objectMapper;


    public void save(String data, MultipartFile file, HttpServletRequest request) {
        Event event = setEvent(data, request, file);
        eventRepository.save(event);
    }


    public void updateImg(Long id, MultipartFile file) {
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new ResponseException("404", "Not Found Event", HttpStatus.NOT_FOUND));
        fileEventServices.saveFile(event.getImg(), file);
    }

    public void update(EventDTO eventDTO) {
        Event event = eventRepository.findById(eventDTO.id()).orElseThrow(() -> new ResponseException("404", "Not Found Event", HttpStatus.NOT_FOUND));
        event.update(eventDTO);
    }

    public void delete(Long id) {
        Event event = eventRepository.findById(id).orElseThrow(() -> new ResponseException("404", "Not Found Event", HttpStatus.NOT_FOUND));
        eventRepository.deleteById(id);
    }

    public EventDTO getEvent(Long id) {
        return eventRepository.findById(id)
                .map(EventDTO::new)
                .orElseThrow(() -> new ResponseException("404", "EL EVENTO NO EXISTE!.", HttpStatus.NOT_FOUND));

    }

    public Resource loadResource(String filename) {
        return fileEventServices.loadResource(filename);
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

    private Event setEvent(String data, HttpServletRequest request, MultipartFile file) {

        Event event = dataToEvent(data);
        event.setAdmin(getAdminContext());
        event.setImg(fileEventServices.saveFile(file, request));
        return event;

    }

    private Event dataToEvent(String data) {
        try {
            EventDTO eventDTO = objectMapper.readValue(data, EventDTO.class);
            return EventDTO.fromEvent(eventDTO);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            throw new ResponseException("404", "ERROR EN EL SERVIDOR", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    private Admin getAdminContext() {
        return userRepository.findByEmail(
                        SecurityContextHolder.getContext().getAuthentication().getName()
                )
                .map(User::getAdmin)
                .orElseThrow(() -> new ResponseException("505", "Internal Server Error", HttpStatus.INTERNAL_SERVER_ERROR));
    }

}
