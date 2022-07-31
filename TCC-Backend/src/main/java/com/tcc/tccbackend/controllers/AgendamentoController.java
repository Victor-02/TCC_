package com.tcc.tccbackend.controllers;

import com.tcc.tccbackend.models.Agendamento;
import com.tcc.tccbackend.services.AgendamentoService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/agendamentos")
public class AgendamentoController {

    final AgendamentoService service;

    public AgendamentoController(AgendamentoService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<?> Insert(@Valid @RequestBody Agendamento agendamento) {
        agendamento = service.save(agendamento);
        return ResponseEntity.status(HttpStatus.CREATED).body(agendamento);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getByID(@PathVariable Integer id) {
        Agendamento agendamento = service.findById(id);
        return ResponseEntity.ok().body(agendamento);
    }

    @GetMapping
    public ResponseEntity<?> getAll(Pageable page) {
        Page<Agendamento> agendamentos = service.getAll(page);
        return ResponseEntity.ok().body(agendamentos);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> delete(@PathVariable Integer id) {
        service.deleteById(id);
        return ResponseEntity.noContent().build();
    }


}
