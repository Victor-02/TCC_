package com.tcc.tccbackend.dtos;

import com.tcc.tccbackend.models.Agendamento;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;


@Data
@NoArgsConstructor
public class PacienteDTO {

    private Integer id;
    private String nome;
    private String email;
    private String dataNascimento;
    private String telefone;
    private String cpf;
    private Agendamento agendamento;

}

