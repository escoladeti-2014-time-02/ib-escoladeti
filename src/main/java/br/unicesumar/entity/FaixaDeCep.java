package br.unicesumar.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class FaixaDeCep extends EntidadeBase {
	/**
	 * 
	 */
	private static final long serialVersionUID = -1041800713051116919L;

	@Column(nullable = false)
	private Integer numeroInferior;

	@Column(nullable = false)
	private Integer numeroSuperior;

	@Column(nullable = false)
	private String cep;

	@JsonIgnore
	@ManyToOne( fetch = FetchType.EAGER )
	private Logradouro logradouro;

	@ManyToOne( fetch = FetchType.EAGER )
	private Bairro bairro;

	public FaixaDeCep() {
	}

	/*
	 * GETTERS E SETTERS
	 */
	public Integer getNumeroInferior() {
		return numeroInferior;
	}

	public void setNumeroInferior(Integer numeroInferior) {
		this.numeroInferior = numeroInferior;
	}

	public Integer getNumeroSuperior() {
		return numeroSuperior;
	}

	public void setNumeroSuperior(Integer numeroSuperior) {
		this.numeroSuperior = numeroSuperior;
	}

	public String getCep() {
		return cep;
	}

	public void setCep(String cep) {
		this.cep = cep;
	}

	public Logradouro getLogradouro() {
		return logradouro;
	}

	public void setLogradouro(Logradouro logradouro) {
		this.logradouro = logradouro;
	}

	public Bairro getBairro() {
		return bairro;
	}

	public void setBairro(Bairro bairro) {
		this.bairro = bairro;
	}
}