package com.tcc.tccbackend.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import org.hibernate.validator.constraints.br.CPF;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import java.io.Serializable;
import java.util.Date;
import java.util.List;

@Data
@Entity
@Table(name = "pacientes")
public class Paciente implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Integer id;

    @Column
    @NotBlank
    private String nome;

    @Column
    @NotBlank
    @Email
    private String email;

    @Column
    @NotBlank
    @CPF
    private String cpf;

    @Column
    @NotBlank
    private String telefone;

    @Column
    private Date dataNascimento;

    @OneToMany(mappedBy="paciente")
    @JsonIgnore
    private List<Agendamento> agendamentos;
}