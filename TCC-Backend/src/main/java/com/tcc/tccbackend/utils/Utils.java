package com.tcc.tccbackend.utils;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

public class Utils {
    public static String extrairExtensao(String nomeArquivo) {
        int i = nomeArquivo.lastIndexOf(".");
        return nomeArquivo.substring(i + 1);
    }
    public static String formatter (LocalDate date){
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
        return date.format(formatter);
    }
}
