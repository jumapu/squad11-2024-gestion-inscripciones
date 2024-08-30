package com.PoloIT.GestionDeInscripciones.Config;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {
//    lo comente por que no me dejava ejecutar para las pruvas
//    @Value("${frontUri}")
    private String uri;

    @Bean
    public WebMvcConfigurer corsConfigure() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/v1/**")
                        .allowedOrigins(uri)
                        .allowedMethods("*");
                WebMvcConfigurer.super.addCorsMappings(registry);
            }
        };
    }
}

