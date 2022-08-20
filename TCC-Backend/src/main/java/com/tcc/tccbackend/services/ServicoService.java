package com.tcc.tccbackend.services;

import com.tcc.tccbackend.models.Servico;
import com.tcc.tccbackend.repository.ServicoRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;

@Service
public class ServicoService {

    final
    ServicoRepository repository;

    public ServicoService(ServicoRepository repository) {
        this.repository = repository;
    }

    public Servico save(Servico servico) {
        try {
            return repository.save(servico);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public Servico findById(Integer id) {
        return repository.findById(id).orElseThrow(() -> new EntityNotFoundException("Servico não encontrado: " + id));
    }

    public Page<Servico> getAll(Pageable page) {
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
