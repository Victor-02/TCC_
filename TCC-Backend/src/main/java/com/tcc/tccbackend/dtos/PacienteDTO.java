package com.tcc.tccbackend.dtos;

import com.tcc.tccbackend.models.Agendamento;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class PacienteDTO {

    private Integer id;
    private String nome;
    private String email;
    private String telefone;
    private String cpf;
    private Agendamento agendamento;
}

