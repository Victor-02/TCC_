package com.tcc.tccbackend.utils;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;

import com.tcc.tccbackend.services.AgendamentoService;

public class Utils {

    @Autowired
    static AgendamentoService agendamentoService;

    public static String extrairExtensao(String nomeArquivo) {
        int i = nomeArquivo.lastIndexOf(".");
        return nomeArquivo.substring(i + 1);
    }
    public static String formatter (LocalDate date){
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
        return date.format(formatter);
    }
}
