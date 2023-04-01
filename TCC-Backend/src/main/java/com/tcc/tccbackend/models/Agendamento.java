package com.tcc.tccbackend.models;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;

import com.fasterxml.jackson.annotation.JsonBackReference;

import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "agendamento")
@NoArgsConstructor
@Data
public class Agendamento implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column
    @NotBlank
    private Date data;

    @ManyToOne
    @JoinColumn(name = "servico_id")
    @JsonBackReference(value = "servico_id")
    private Servico servico;

    @ManyToOne
    @JoinColumn(name = "paciente_id")
    @JsonBackReference(value = "paciente_id")
    private Paciente paciente;

    @ManyToOne
    @JoinColumn(name = "profissional_id")
    @JsonBackReference(value = "profissional_id")
    private Profissional profissional;

}
