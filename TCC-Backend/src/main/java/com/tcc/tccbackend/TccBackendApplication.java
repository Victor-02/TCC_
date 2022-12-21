package com.tcc.tccbackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication(scanBasePackages = "com.tcc.tccbackend.*")
@EnableJpaRepositories(value = "com.tcc.tccbackend.repository")
@EntityScan(value = "com.tcc.tccbackend.models")
@RestController
public class TccBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(TccBackendApplication.class, args);
    }
}

