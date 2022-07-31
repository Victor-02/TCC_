package com.tcc.tccbackend.controllers;

import com.tcc.tccbackend.models.Import;
import com.tcc.tccbackend.models.Paciente;
import com.tcc.tccbackend.services.ImportService;
import com.tcc.tccbackend.services.PacienteService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Objects;
import java.util.UUID;

@RestController
@RequestMapping(value = "/api/importacao", produces = {"application/json"})
@CrossOrigin("*")
@Slf4j
public class ImportController {


    final PacienteService pacienteService;

    final ImportService importService;

    public ImportController(PacienteService pacienteService, ImportService importService) {
        this.pacienteService = pacienteService;
        this.importService = importService;
    }

    @PostMapping("/upload")
    public ResponseEntity<String> salvarArquivo(@RequestParam("file") MultipartFile file) {
        String path = UUID.randomUUID() + "." + extrairExtensao(Objects.requireNonNull(file.getOriginalFilename()));

        try {
            List<Paciente> pacientes = pacienteService.converteArquivo(file);
            pacienteService.saveAll(pacientes);
            Files.copy(file.getInputStream(), Path.of(path), StandardCopyOption.REPLACE_EXISTING);

            Import importacao = new Import(path, formatter(LocalDate.now()));
            importService.saveImport(importacao);
            return new ResponseEntity<>("{\"Arquivo carregado com sucesso!\"}", HttpStatus.OK);
        } catch (Exception e) {
            log.error(e.getMessage());
            return new ResponseEntity<>("{\"Erro ao carregar o arquivo!\"}",
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping
    public ResponseEntity<?> getAll(Pageable page) {
        Page<Import> imports = importService.getAll(page);
        System.out.println(page);
        return ResponseEntity.ok().body(imports);

    }

    @GetMapping("/{id}")
    public ResponseEntity<?> findById(@PathVariable Integer id) {
        Import importacao = importService.findById(id);
        return ResponseEntity.ok().body(importacao);
    }

    private String extrairExtensao(String nomeArquivo) {
        int i = nomeArquivo.lastIndexOf(".");
        return nomeArquivo.substring(i + 1);
    }
    private String formatter (LocalDate date){
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
        return date.format(formatter);
    }
}