package com.tcc.tccbackend.services;

import com.tcc.tccbackend.dtos.PacienteDTO;
import com.tcc.tccbackend.models.Paciente;
import com.tcc.tccbackend.repository.PacienteRepository;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.CellType;
import org.apache.poi.ss.usermodel.DataFormat;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.util.DateFormatConverter;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.EntityNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Locale;

@Service
public class PacienteService {

    final PacienteRepository repository;
    final ModelMapper mapper;

    public PacienteService(PacienteRepository repository, ModelMapper mapper) {
        this.repository = repository;
        this.mapper = mapper;
    }

    public Paciente save(Paciente paciente) {
        try {
            return repository.save(paciente);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public void saveAll(List<Paciente> pacientes) {
        try {
            repository.saveAll(pacientes);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public Paciente findById(Integer id) {
        return repository.findById(id).orElseThrow(() -> new EntityNotFoundException("Paciente não encontrado: " + id));
    }

    public List<Paciente> searchPacientes(String query) {
        return repository.findByCpfContaining(query);
    }

    public Page<PacienteDTO> getAllPage(Pageable page) {
        try {
            Pageable pageable = PageRequest.of(page.getPageNumber(), page.getPageSize());
            List<PacienteDTO> pacientes = transfer(repository.findAll());
            Page<PacienteDTO> pacientesPage = toPage(pacientes, pageable);
            return pacientesPage;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public List<PacienteDTO> getAll() {
        try {
            return transfer(repository.findAll());
            
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public Paciente update(Integer id, Paciente pacienteAtt) {
        try {
            Paciente paciente = repository.findById(id).orElseThrow(() -> new EntityNotFoundException("Paciente não encontrado: " + id));
            updateData(paciente, pacienteAtt);
            return repository.save(paciente);
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

    private void updateData(Paciente paciente, Paciente pacienteAtt) {
        paciente.setNome(pacienteAtt.getNome());
        paciente.setEmail(pacienteAtt.getEmail());
        paciente.setCpf(pacienteAtt.getCpf());
        paciente.setTelefone(pacienteAtt.getTelefone());
    }

    

    private Page toPage(List<PacienteDTO> list, Pageable pageable){
        int start = (int)pageable.getOffset();
        int end = Math.min((start + pageable.getPageSize()), list.size());
        Page<Paciente> page = new PageImpl(list.subList(start, end), pageable, list.size());
        return page;
    }

    private List<PacienteDTO> transfer ( List<Paciente> pacientes) {
        List<PacienteDTO> PacienteDTOList = new ArrayList<>();
        for(Paciente paciente : pacientes) {
            PacienteDTO dto = mapper.map(paciente, PacienteDTO.class);
            PacienteDTOList.add(dto);
        }
        return PacienteDTOList;
    }
}