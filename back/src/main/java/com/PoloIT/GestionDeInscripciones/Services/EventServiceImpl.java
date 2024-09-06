package com.PoloIT.GestionDeInscripciones.Services;

import com.PoloIT.GestionDeInscripciones.Config.ExecptionControll.ResponseException;
import com.PoloIT.GestionDeInscripciones.DTO.EventDTO;
import com.PoloIT.GestionDeInscripciones.Entity.Admin;
import com.PoloIT.GestionDeInscripciones.Entity.Event;
import com.PoloIT.GestionDeInscripciones.Entity.User;
import com.PoloIT.GestionDeInscripciones.Repository.EventRepository;
import com.PoloIT.GestionDeInscripciones.Repository.UserRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.FileAlreadyExistsException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;
import java.util.Map;
import java.util.UUID;


@Service
@RequiredArgsConstructor
public class EventServiceImpl {

    private final UserRepository userRepository;
    private final EventRepository eventRepository;
    private final ObjectMapper objectMapper;

    @Value("${image.directory.event}")
    private Path directoryPath;

    public void save(String data, MultipartFile file) {
        EventDTO eventDTO = dataToEventDTO(data);
        if (eventRepository.existsByName(eventDTO.name()))
            throw new ResponseException("Name", "Event name in used!", HttpStatus.NOT_ACCEPTABLE);

        Event event = EventDTO.fromEvent(eventDTO);
        event.setAdmin(getAdminContext());
        event.setImg(UUID.randomUUID() + "." + StringUtils.getFilenameExtension(file.getOriginalFilename()));

        eventRepository.save(event);


        try {

            if (!Files.exists(directoryPath)) {
                Files.createDirectories(directoryPath);
            }

        } catch (IOException e) {
            throw new ResponseException("500", "Error creating directory: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }

        try {
            File destFile = directoryPath.resolve(event.getImg()).toFile();

            Files.copy(file.getInputStream(), directoryPath.resolve(event.getImg()));
        } catch (IOException e) {
            if (e instanceof FileAlreadyExistsException) {
                throw new ResponseException("404", "A file of that name already exists.", HttpStatus.CONFLICT);
            }
            throw new ResponseException("500", e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }


    }

    public void update(EventDTO eventDTO) {
        Event event = eventRepository.findById(eventDTO.id()).orElseThrow(() -> new ResponseException("404", "Not Found Event", HttpStatus.NOT_FOUND));
        event.update(eventDTO);
    }

    public void delete(Long id) {
        Event event = eventRepository.findById(id).orElseThrow(() -> new ResponseException("404", "Not Found Event", HttpStatus.NOT_FOUND));
        eventRepository.deleteById(id);
    }

    public EventDTO get(Long id, HttpServletRequest request) {
        String host = request.getRequestURL().toString().replace(request.getRequestURI(), "");

        Event event = eventRepository.findById(id)
//                .map(EventDTO::new)
                .orElseThrow(() -> new ResponseException("404", "Not Found Event", HttpStatus.NOT_FOUND));

        String url = ServletUriComponentsBuilder
                .fromHttpUrl(host)
                .path("/api/v1/admin/event/media/")
                .path(event.getImg())
                .toUriString();
        event.setImg(url);
        return new EventDTO(event);

    }

    public Resource loadResource(String filename) {

        try {

            Path file = directoryPath.resolve(filename);
            Resource resource = new UrlResource((file.toUri()));

            if (resource.exists() || resource.isReadable()) {
                return resource;
            }

            throw new ResponseException("404", "No existe la imagen " + filename, HttpStatus.NOT_FOUND);

        } catch (MalformedURLException e) {

            throw new ResponseException("404", "No existe la imagen " + filename, HttpStatus.NOT_FOUND);
        }
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

    private EventDTO dataToEventDTO(String data) {
        try {

            return objectMapper.readValue(data, EventDTO.class);
        } catch (Exception e) {
            e.printStackTrace();
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
