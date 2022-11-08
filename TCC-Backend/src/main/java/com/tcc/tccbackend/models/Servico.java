package com.tcc.tccbackend.models;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

@Data
@Entity
@Table(name = "servico")
public class Servico implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column
    private String nome;

    @Column
    private Double preco;

    @Column
    @OneToMany (mappedBy = "servico")
    @JsonManagedReference(value = "servico_id")
    private List<Agendamento> agendamentos;

}
