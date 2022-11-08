package com.tcc.tccbackend.services;

import com.tcc.tccbackend.models.Agendamento;
import com.tcc.tccbackend.repository.AgendamentoRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
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

    public void deleteById(Integer id) {
        try {
            repository.deleteById(id);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public List<Agendamento> getAll2() {
        return repository.findAll();
    }

    private Page toPage(List<Object[]> list, Pageable pageable){
        int start = (int)pageable.getOffset();
        int end = Math.min((start + pageable.getPageSize()), list.size());
        Page<Agendamento> page = new PageImpl(list.subList(start, end), pageable, list.size());
        return page;
    }

    public Page<Object[]> getAll(Pageable page) {
        try {
            Pageable pageable = PageRequest.of(page.getPageNumber(), page.getPageSize());
            Page<Object[]> pacientesPage = toPage(repository.agendamentos(), pageable);
            return pacientesPage;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }


}
