package com.tcc.tccbackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication(scanBasePackages = "com.tcc.tccbackend.*")
@EnableJpaRepositories(value = "com.tcc.tccbackend.repository")
@EntityScan(value = "com.tcc.tccbackend.models")
public class TccBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(TccBackendApplication.class, args);
    }

}