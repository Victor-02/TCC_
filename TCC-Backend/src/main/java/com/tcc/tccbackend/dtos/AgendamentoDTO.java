package com.tcc.tccbackend.dtos;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class AgendamentoDTO {
    private Integer id;
    private String data;
    private String servico;
    private String paciente;
    private String profissional;

    /*public AgendamentoDTO(Integer id, String data, String servico, String paciente, String profissional) {
        this.id = id;
        this.data = data;
        this.servico = servico;
        this.paciente = paciente;
        this.profissional = profissional;
    }*/

    public AgendamentoDTO(Integer id, String paciente, String data, String profissional, String servico) {
        this.id = id;
        this.data = data;
        this.servico = servico;
        this.paciente = paciente;
        this.profissional = profissional;
    }
}
