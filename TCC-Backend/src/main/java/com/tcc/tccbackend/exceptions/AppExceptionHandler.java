package com.tcc.tccbackend.exceptions;

import java.time.Instant;

import javax.persistence.EntityExistsException;
import javax.persistence.EntityNotFoundException;
import javax.servlet.http.HttpServletRequest;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class AppExceptionHandler {

	@ExceptionHandler(EntityNotFoundException.class)
	public ResponseEntity<ErrorMessage> entityNotFound(EntityNotFoundException e, HttpServletRequest requisicao) {
		ErrorMessage err = new ErrorMessage();
		err.setDataAtual(Instant.now());
		err.setStatus(HttpStatus.NOT_FOUND.value());
		err.setErro(HttpStatus.NOT_FOUND.toString());
		err.setMensagem("Paciente não encontrado");
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(err);
	}

	@ExceptionHandler(EntityExistsException.class)
	public ResponseEntity<ErrorMessage> entityExists(EntityExistsException e, HttpServletRequest requisicao) {
		ErrorMessage err = new ErrorMessage();
		err.setDataAtual(Instant.now());
		err.setStatus(HttpStatus.UNPROCESSABLE_ENTITY.value());
		err.setErro(HttpStatus.UNPROCESSABLE_ENTITY.toString());
		err.setMensagem("Um ou mais Pacientes já existem!");
		return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).body(err);
	}
}
