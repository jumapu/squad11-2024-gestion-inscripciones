package com.PoloIT.GestionDeInscripciones.Controller;


import com.PoloIT.GestionDeInscripciones.Services.EventServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.nio.file.Files;

@RestController
@RequestMapping("/api/v1/media/")
@RequiredArgsConstructor
public class PublicController {
    private final EventServiceImpl eventServiceImpl;

    @GetMapping("/event/{filename:.+}")
    @ResponseBody
    public ResponseEntity<Resource> loadEvent(@PathVariable String filename) throws IOException, IOException {
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

    @GetMapping("/profile/{filename:.+}")
    @ResponseBody
    public ResponseEntity<Resource> loadProfile(@PathVariable String filename) throws IOException, IOException {
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


}