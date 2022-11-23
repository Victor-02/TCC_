package com.tcc.tccbackend.utils;

import com.tcc.tccbackend.services.AgendamentoService;
import org.springframework.beans.factory.annotation.Autowired;

import java.time.LocalDate;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.Date;

public class Utils {

    @Autowired
    static AgendamentoService agendamentoService;

    public static String extrairExtensao(String nomeArquivo) {
        int i = nomeArquivo.lastIndexOf(".");
        return nomeArquivo.substring(i + 1);
    }

    public static String formatter(LocalDate date) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
        return date.format(formatter);
    }

    public static String toDate(Date date) {
        return Utils.formatter(date.toInstant()
                .atZone(ZoneId.systemDefault())
                .toLocalDateTime()
                .toLocalDate());
    }
}
