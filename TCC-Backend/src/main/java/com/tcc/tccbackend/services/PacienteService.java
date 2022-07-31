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
import org.apache.poi.xssf.usermodel.XSSFDataFormat;
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
import java.util.Date;
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

    public Page<PacienteDTO> getAll(Pageable page) {
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

    public List<Paciente> converteArquivo(MultipartFile file) throws IOException {

        

        List<Paciente> pacientes = new ArrayList<>();

        InputStream fis = file.getInputStream();
        XSSFWorkbook workBook = new XSSFWorkbook(fis);
        final XSSFSheet sheet = workBook.getSheetAt(0);

        Iterator<Row> rowIterator = sheet.iterator();
        
        String excelFormatPattern = DateFormatConverter.convert(Locale.US, "dd/MM/yyyy");

        CellStyle cellStyle = workBook.createCellStyle();

        DataFormat poiFormat = workBook.createDataFormat();
        cellStyle.setDataFormat(poiFormat.getFormat(excelFormatPattern));
        

        while (rowIterator.hasNext()) {
            Row row = rowIterator.next();
            if (verificaLinhaVazia(row)) continue;
            Paciente paciente = new Paciente();
            pacientes.add(paciente);

            Iterator<Cell> cellIterator = row.iterator();
            while (cellIterator.hasNext()) {
                Cell cell = cellIterator.next();

                switch (cell.getColumnIndex()) {
                    case 0:
                        paciente.setNome(cell.getStringCellValue());
                        break;
                    case 1:
                        paciente.setEmail(cell.getStringCellValue());
                        break;
                    case 2:
                        paciente.setCpf(cell.getStringCellValue());
                        break;
                    case 3:
                        paciente.setTelefone(cell.getStringCellValue());
                        break;
                    case 4:
                        paciente.setDataNascimento(cell.getDateCellValue());
                        break;
                }
            }

        }
        workBook.close();
        fis.close();
        return pacientes;
    }

    private static boolean verificaLinhaVazia(Row row) {
        for (int c = row.getFirstCellNum(); c < row.getLastCellNum(); c++) {
            Cell cell = row.getCell(c);
            if (cell != null && cell.getCellType() != CellType.BLANK) return false;
        }
        return true;
    }

    private Page toPage(List<PacienteDTO> list, Pageable pageable){
        int start = (int)pageable.getOffset();
        int end = Math.min((start + pageable.getPageSize()), list.size());
        Page<Paciente> page = new PageImpl(list.subList(start, end), pageable, list.size());
        return page;
    }

    private List<PacienteDTO> transfer ( List<Paciente> pacientes) {
        List<PacienteDTO> PacienteDTOList = new ArrayList();
        for(Paciente paciente : pacientes) {
            PacienteDTO dto = mapper.map(paciente, PacienteDTO.class);
            PacienteDTOList.add(dto);
        }
        return PacienteDTOList;
    }
}