package com.tcc.tccbackend.dtos;

import lombok.Data;
import org.hibernate.validator.constraints.br.CPF;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Data
public class AtendenteDTO {

    private Integer id;

    @NotBlank
    @Size(min=3, message="Nome Inválido (mínimo 3 caracteres)")
    private String username;

    @NotBlank
    @Email(message="Email Inválido")
    private String email;

    @NotBlank
    @Size(min=5, max=15 , message="Senha Inválido (5-15 Caracteres)")
    private String senha;

    @NotBlank
    private String telefone;
}
