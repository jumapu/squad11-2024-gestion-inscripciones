package com.PoloIT.GestionDeInscripciones.Controller;

import com.PoloIT.GestionDeInscripciones.DTO.EventDTO;
import com.PoloIT.GestionDeInscripciones.Services.EventServiceImpl;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/admin/event/")
@RequiredArgsConstructor
public class EventController {

    private final EventServiceImpl eventServiceImpl;
    private final HttpServletRequest request;

    @PostMapping("save")
    public ResponseEntity<Map<String, String>> registerEvent(@RequestPart("data") String data, @RequestPart("file") MultipartFile file) {
        eventServiceImpl.save(data, file);


        return new ResponseEntity<>(Map.of("Event", "Save Event"), HttpStatus.CREATED);
    }

    @GetMapping("/media/{filename:.+}")
    @ResponseBody
    public ResponseEntity<Resource> loadRecibo(@PathVariable String filename) throws IOException, IOException {
        Resource file = eventServiceImpl.loadResource(filename);
        String contentType = Files.probeContentType(file.getFile().toPath());

        //! este es para descargar archivos
//        return ResponseEntity
//                .ok()
//                .header(HttpHeaders.CONTENT_DISPOSITION, contentType)
//                .body(file);
        return ResponseEntity.ok().header(HttpHeaders.CONTENT_TYPE, contentType)
                .body(file);


    }

    @PatchMapping("update")
    @Transactional
    public ResponseEntity<Map<String, String>> patchEvent(@RequestBody @Valid EventDTO dataUpdateEvent) {

        return new ResponseEntity<>(Map.of("Event", "updated Event"), HttpStatus.ACCEPTED);
    }


    @GetMapping("all")
    public ResponseEntity<Map<String, List<EventDTO>>> listEvents() {
        Map<String, List<EventDTO>> body = eventServiceImpl.all();
        return new ResponseEntity<>(body, HttpStatus.OK);
    }


    @GetMapping("all/notActive")
    public ResponseEntity<Map<String, List<EventDTO>>> listEventsNotActive() {
        Map<String, List<EventDTO>> body = eventServiceImpl.AllInactiveEvent();
        return new ResponseEntity<>(body, HttpStatus.OK);
    }

    @GetMapping("all/active")
    public ResponseEntity<Map<String, List<EventDTO>>> listEventsActive() {
        Map<String, List<EventDTO>> body = eventServiceImpl.AllActiveEvent();
        return new ResponseEntity<>(body, HttpStatus.OK);
    }


    @GetMapping("/{id}")
    public ResponseEntity<Map<String, EventDTO>> getEvent(@PathVariable Long id) {
        EventDTO body = eventServiceImpl.get(id, request);
        return new ResponseEntity<>(Map.of("Event", body), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deleteEvent(@PathVariable Long id) {
        eventServiceImpl.delete(id);
        return new ResponseEntity<>(Map.of("Event", "Event eliminated"), HttpStatus.ACCEPTED);
    }
}

