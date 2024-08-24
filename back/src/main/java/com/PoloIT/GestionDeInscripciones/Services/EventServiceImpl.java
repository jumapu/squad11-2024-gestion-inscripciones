package com.PoloIT.GestionDeInscripciones.Services;

import com.PoloIT.GestionDeInscripciones.Config.ExecptionControll.ResponseException;
import com.PoloIT.GestionDeInscripciones.DTO.EventDTO;
import com.PoloIT.GestionDeInscripciones.DTO.EventsDTO.DataUpdateEvent;
import com.PoloIT.GestionDeInscripciones.DTO.MentorDTO;
import com.PoloIT.GestionDeInscripciones.DTO.RegistrationDTO;
import com.PoloIT.GestionDeInscripciones.DTO.StudentDTO;
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
import java.util.stream.Collectors;


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

    public Event updateEventDB(DataUpdateEvent dataUpdateEvent) {
        Event event = eventRepository.findById(dataUpdateEvent.id()).orElseThrow(() -> new ResponseException("404", "Not Found Event", HttpStatus.NOT_FOUND));
        event.updateEvent(dataUpdateEvent);
        return event;
    }

    public Event deleteEventDB(Long id) {
        Event event = eventRepository.findById(id).orElseThrow(() -> new ResponseException("404", "Not Found Event", HttpStatus.NOT_FOUND));
        event.deactivateEvent();
        return event;
    }

    public Event getEventDB(Long id) {
        return eventRepository.findById(id).orElseThrow(() -> new ResponseException("404", "Not Found Event", HttpStatus.NOT_FOUND));
    }

    public Map<String, List<EventDTO>> allEvent() {
        List<EventDTO> list = eventRepository.findAll().stream()
                .map(event -> {
                    RegistrationDTO registrationDTO = new RegistrationDTO(
                            event.getRegistration().getCreatedAt()
                            , event.getRegistration().getFinishAt()
                            , event.getRegistration().getUpdatedAt(),
                            event.getRegistration().getStudents().stream()
                                    .map(student -> new StudentDTO(student.getId(), student.getName(), student.getSkills(), student.getCourses(), student.getProfiles(), student.getLinkedin())).collect(Collectors.toList())
                            , event.getRegistration().getMentors().stream()
                            .map(mentor -> new MentorDTO(mentor.getId(), mentor.getName(), mentor.getCompany(), mentor.getLastName(), mentor.getSkills(), mentor.getProfiles(), mentor.getLinkedin())).collect(Collectors.toList())
                    );

                    return new EventDTO(event.getId(), event.getName(), event.getDescription(), event.getCreatedAt(), event.getFinishAt(), registrationDTO, event.isActive());

                }).toList();
        return Map.of("Events", list);
    }

    public Map<String, List<EventDTO>> allEventsActive() {

        System.out.println(allEvent().get("Events").stream().filter(EventDTO::isActive).toList());
        return Map.of(
                "Events",
                allEvent().get("Events").stream().filter(EventDTO::isActive).toList()
        );
    }

    public Map<String, List<EventDTO>> allEventsNotActive() {
        return Map.of(
                "Events",
                allEvent().get("Events").stream().filter(eventDTO -> !eventDTO.isActive()).toList()
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
