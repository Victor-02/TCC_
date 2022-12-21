package com.tcc.tccbackend.controllers;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.tcc.tccbackend.dtos.PacienteDTO;
import com.tcc.tccbackend.models.Paciente;
import com.tcc.tccbackend.services.PacienteService;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/pacientes")
@JsonFormat(pattern = "dd/MM/yyyy")
public class PacienteController {

    final PacienteService service;
    final ModelMapper mapper;
    private final Logger logger = LoggerFactory.getLogger(ImportController.class);

    public PacienteController(PacienteService service, ModelMapper mapper) {
        this.service = service;
        this.mapper = mapper;
    }

    @PostMapping
    public ResponseEntity<?> Insert(@Valid @RequestBody Paciente paciente) {
        paciente = service.save(paciente);
        logger.info("Efetuando insercao de paciente");
        return ResponseEntity.status(HttpStatus.CREATED).body(paciente);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getByID(@PathVariable Integer id) {
        Paciente paciente = service.findById(id);
        PacienteDTO pacienteDTO = this.toPacienteDTO(paciente);
        logger.info("Efetuando busca por ID do veiculo: %d", paciente.getId());
        return ResponseEntity.ok().body(pacienteDTO);
    }

    @GetMapping
    public ResponseEntity<?> getAllPage(Pageable page) {
        Page<PacienteDTO> pacientes = service.getAllPage(page);
        return ResponseEntity.ok().body(pacientes);
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAll() {
        List<Paciente> profissionais = service.getAll();
        return ResponseEntity.ok().body(profissionais);
    }

    @GetMapping("/search")
    public ResponseEntity<List<Paciente>> search(@RequestParam("key") String query) {
        logger.info("Efetuando busca por CPF do veiculo: %d", query);
        return ResponseEntity.ok(service.searchPacientes(query));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Object> update(@RequestBody Paciente paciente, @PathVariable Integer id) {
        paciente = service.update(id, paciente);
        return ResponseEntity.ok().body(paciente);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> delete(@PathVariable Integer id) {
        service.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    private PacienteDTO toPacienteDTO(Paciente paciente) {
        return mapper.map(paciente, PacienteDTO.class);
    }


}