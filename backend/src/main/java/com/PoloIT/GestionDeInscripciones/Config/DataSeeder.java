package com.PoloIT.GestionDeInscripciones.Config;

import com.PoloIT.GestionDeInscripciones.Entity.Admin;
import com.PoloIT.GestionDeInscripciones.Entity.Mentor;
import com.PoloIT.GestionDeInscripciones.Entity.Student;
import com.PoloIT.GestionDeInscripciones.Entity.User;
import com.PoloIT.GestionDeInscripciones.Enums.Rol;
import com.PoloIT.GestionDeInscripciones.Repository.AdminRepository;
import com.PoloIT.GestionDeInscripciones.Repository.MentorRepository;
import com.PoloIT.GestionDeInscripciones.Repository.StudentRepository;
import com.PoloIT.GestionDeInscripciones.Services.AuthServiceImpl;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Component
public class DataSeeder implements CommandLineRunner {

    private final AuthServiceImpl authService;
    private final PasswordEncoder encoder;
    private final MentorRepository mentorRepository;
    private final StudentRepository studentRepository;
    private final AdminRepository adminRepository;

    public DataSeeder(AuthServiceImpl authService, PasswordEncoder encoder,
                      MentorRepository mentorRepository, StudentRepository studentRepository,
                      AdminRepository adminRepository) {
        this.authService = authService;
        this.encoder = encoder;
        this.mentorRepository = mentorRepository;
        this.studentRepository = studentRepository;
        this.adminRepository = adminRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        seedData();
    }

    private void seedData() {
        List<Student> students = new ArrayList<>();
        List<Mentor> mentors = new ArrayList<>();

        //* Crear estudiantes
        String[][] studentData = {
                {"John", "Doe", "java developer", "Tech For Good"},
                {"Jane", "Smith", "python developer", "Future Coders"},
                {"Emily", "Davis", "QA", "Code For Change"},
                {"Michael", "Johnson", "frontend developer", "Web Innovators"},
                {"Sarah", "Brown", "UX/UI designer", "Design Impact"},
                {"David", "Wilson", "QA", "Quality Matters"},
                {"Chris", "Taylor", "frontend developer", "Dev for All"},
                {"Jessica", "Anderson", "UX/UI designer", "Creativity Matters"},
                {"James", "Thomas", "python developer", "Code for Community"},
                {"Laura", "Martinez", "java developer", "Tech Bridges"},
                {"Daniel", "Hernandez", "QA", "Testing Solutions"},
                {"Sophia", "Lopez", "frontend developer", "User Experience Labs"},
                {"Emma", "Gonzalez", "UX/UI designer", "Designers Unite"},
                {"Olivia", "Clark", "java developer", "Code Together"},
                {"Liam", "Robinson", "python developer", "Python for Everyone"},
                {"Isabella", "Lewis", "QA", "Quality Assurance Co"},
                {"Noah", "Walker", "frontend developer", "Web Wizards"}
        };

        for (String[] data : studentData) {
            String name = data[0];
            String lastName = data[1];
            Set<String> roles = Set.of(data[2]);
            String ong = data[3];
            students.add(createStudent(name, lastName, roles, ong));
        }

        //* Crear mentores
        String[][] mentorData = {
                {"Alice", "Green", "java developer", "Tech Corp"},
                {"Bob", "White", "QA", "Quality Assurance Inc"},
                {"Charlie", "Black", "design", "Creative Studio"},
                {"Diana", "Blue", "DevOps", "Cloud Solutions"},
                {"Evelyn", "Red", "Project Manager", "Management Co"},
                {"Frank", "Orange", "design", "Design House"},
                {"Grace", "Purple", "QA", "Quality Control"},
                {"Henry", "Pink", "java developer", "Java Solutions"}
        };

        for (String[] data : mentorData) {
            String name = data[0];
            String lastName = data[1];
            Set<String> roles = Set.of(data[2]);
            String company = data[3];
            mentors.add(createMentor(name, lastName, roles, company));
        }

        createAdmin("admin", "admin1234");

        mentorRepository.saveAll(mentors);
        studentRepository.saveAll(students);
    }

    private Student createStudent(String firstName, String lastName, Set<String> roles, String ong) {
        return Student.builder()
                .user(User.builder()
                        .password(encoder.encode("12345678"))
                        .email(firstName.toLowerCase() + lastName.toLowerCase() + "@gmail.com")
                        .rol(Rol.STUDENT)
                        .build())
                .name(firstName)
                .lastName(lastName)
                .rol(roles)
                .ong(ong)
                .imgUrl("https://randomuser.me/api/portraits/men/1.jpg")
                .build();
    }

    private Mentor createMentor(String firstName, String lastName, Set<String> roles, String company) {
        return Mentor.builder()
                .user(User.builder()
                        .password(encoder.encode("12345678"))
                        .email(firstName.toLowerCase() + lastName.toLowerCase() + "@gmail.com")
                        .rol(Rol.MENTOR)
                        .build())
                .rol(roles)
                .name(firstName)
                .lastName(lastName)
                .imgUrl("https://randomuser.me/api/portraits/women/2.jpg")
                .company(company)
                .build();
    }

    private void createAdmin(String username, String password) {
        User adminUser = User.builder()
                .email(username + "@gmail.com")
                .password(encoder.encode(password))
                .rol(Rol.ADMIN)
                .build();

        Admin admin = Admin.builder()
                .name(username)
                .user(adminUser)
                .build();

        adminRepository.save(admin);
    }
}
