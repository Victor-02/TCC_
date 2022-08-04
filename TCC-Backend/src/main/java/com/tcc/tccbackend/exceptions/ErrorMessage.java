import java.io.Serializable;
package com.tcc.tccbackend.dtos;

import java.time.Instant;

public class ErrorMessage implements Serializable{
	private static final long serialVersionUID = 1L;

	private Instant dataAtual;
	private String erro;
	private Integer Status;
	private String mensagem;

	public ErrorMessage() {
	}

	public Instant getDataAtual() {
		return dataAtual;
	}

	public void setDataAtual(Instant dataAtual) {
		this.dataAtual = dataAtual;
	}

	public String getErro() {
		return erro;
	}

	public void setErro(String erro) {
		this.erro = erro;
	}

	public Integer getStatus() {
		return Status;
	}

	public void setStatus(Integer status) {
		Status = status;
	}

	public String getMensagem() {
		return mensagem;
	}

	public void setMensagem(String mensagem) {
		this.mensagem = mensagem;
	}

}