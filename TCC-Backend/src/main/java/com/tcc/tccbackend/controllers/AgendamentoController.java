package com.tcc.tccbackend.controllers;

import com.tcc.tccbackend.dtos.AgendamentoDTO;
import com.tcc.tccbackend.dtos.PacienteDTO;
import com.tcc.tccbackend.models.Agendamento;
import com.tcc.tccbackend.services.AgendamentoService;
import com.tcc.tccbackend.utils.Utils;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/agendamentos")
public class AgendamentoController {

    final AgendamentoService service;
    private final Logger logger = LoggerFactory.getLogger(AgendamentoController.class);

    public AgendamentoController(AgendamentoService service) {
        this.service = service;
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> Insert(@Valid @RequestBody Agendamento agendamento) {
        agendamento = service.save(agendamento);
        logger.info("Efetuando insercão de Agendamento");
        return ResponseEntity.status(HttpStatus.CREATED).body(agendamento);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getByID(@PathVariable Integer id) {
        Agendamento agendamento = service.findById(id);
        return ResponseEntity.ok().body(agendamento);
    }

    @GetMapping
    public ResponseEntity<?> getAll(Pageable page) {
        Page<AgendamentoDTO> agendamentos = service.getAll(page);
        return ResponseEntity.ok().body(agendamentos);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> delete(@PathVariable Integer id) {
        service.deleteById(id);
        return ResponseEntity.noContent().build();
    }
    
}