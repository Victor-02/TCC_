package com.tcc.tccbackend.models;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;

@Data
@Entity
@Table(name = "atendentes")
public class Atendente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column
    private String username;

    @Column
    private String email;

    @Column
    private String senha;

    @Column
    private String nome;

    @Column
    private String SobreNome;

    @Column
    private String cpf;

    @Column
    private String telefone;
}
