package com.tcc.tccbackend.models;

import lombok.Data;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import java.util.List;

@Data
@Entity
@Table(name = "profissionais")
public class Profissional {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column
    private String email;

    @Column
    private String nome;

    @Column
    private String cpf;

    @Column
    private String cnpj;

    @Column
    private String telefone;

    @Column
    @OneToMany(mappedBy = "profissional")
    @JsonManagedReference(value = "profissional_id")
    private List<Agendamento> agendamentos;
}
