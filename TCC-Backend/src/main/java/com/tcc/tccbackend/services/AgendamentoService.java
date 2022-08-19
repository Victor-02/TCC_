package com.tcc.tccbackend.services;

import com.tcc.tccbackend.models.Agendamento;
import com.tcc.tccbackend.repository.AgendamentoRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.List;
@Service
public class AgendamentoService {
    final
    AgendamentoRepository repository;

    public AgendamentoService(AgendamentoRepository repository) {
        this.repository = repository;
    }

    public Agendamento save(Agendamento agendamento) {
        try {
            return repository.save(agendamento);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public void saveAll(List<Agendamento> agendamentos) {
        try {
            repository.saveAll(agendamentos);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public Agendamento findById(Integer id) {
        return repository.findById(id).orElseThrow(() -> new EntityNotFoundException("Agendamento não encontrado: " + id));
    }

    public Page<Agendamento> getAll(Pageable page) {
        try {
            return repository.findAll(page);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public void deleteById(Integer id) {
        try {
            repository.deleteById(id);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }


}
