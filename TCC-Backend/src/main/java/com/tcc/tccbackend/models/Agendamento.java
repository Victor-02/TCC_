package com.tcc.tccbackend.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.io.Serializable;

@Data
@Entity
@Table(name = "agendamento")
public class Agendamento implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column
    @NotBlank
    private String data;


    @ManyToOne
    @JoinColumn(name = "servico_id")
    @JsonBackReference
    private Servico servico;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "paciente_id")
    private Paciente paciente;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "profissional_id")
    private Profissional profissional;

}
