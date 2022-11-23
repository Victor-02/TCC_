package com.tcc.tccbackend.services;


import com.tcc.tccbackend.dtos.AgendamentoDTO;
import com.tcc.tccbackend.models.Agendamento;
import com.tcc.tccbackend.repository.AgendamentoRepository;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.ArrayList;
import java.util.List;

@Service
public class AgendamentoService {
    final AgendamentoRepository repository;
    final ModelMapper mapper;

    public AgendamentoService(AgendamentoRepository repository, ModelMapper mapper) {
        this.repository = repository;
        this.mapper = mapper;
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

    private Page toPage(List<AgendamentoDTO> list, Pageable pageable) {
        int start = (int) pageable.getOffset();
        int end = Math.min((start + pageable.getPageSize()), list.size());
        Page<Agendamento> page = new PageImpl(list.subList(start, end), pageable, list.size());
        return page;
    }

    public Page<AgendamentoDTO> getAll(Pageable page) {
        try {
            Pageable pageable = PageRequest.of(page.getPageNumber(), page.getPageSize());
            Page<AgendamentoDTO> pacientesPage = toPage(repository.agendamentos(), pageable);
            return pacientesPage;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    private List<AgendamentoDTO> transfer(List<Object[]> agendamentos) {
        List<AgendamentoDTO> AgendamentoDTOList = new ArrayList<>();
        for (Object[] agendamento : agendamentos) {
            AgendamentoDTO dto = mapper.map(agendamento, AgendamentoDTO.class);
            AgendamentoDTOList.add(dto);
        }
        return AgendamentoDTOList;
    }

}
