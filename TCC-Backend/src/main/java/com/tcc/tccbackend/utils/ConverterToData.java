package com.tcc.tccbackend.utils;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Locale;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.CellType;
import org.apache.poi.ss.usermodel.DataFormat;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.util.DateFormatConverter;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.web.multipart.MultipartFile;

import com.tcc.tccbackend.models.Paciente;

public class ConverterToData {
    
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
}
