package br.unicesumar.entity;

import javax.persistence.Entity;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Entity
public class Pais extends EntidadeBase {
	/**
	 * 
	 */
	private static final long serialVersionUID = 5776947563045479629L;
 
	@NotNull
	@Size(min = 3, max = 72)
	private String nome;
 
	@NotNull
	@Size(max = 3)
	private String sigla;

	@NotNull
	private Integer ddi;

	public Pais() {
	}
	/*
	 * GETTERS E SETTERS
	 */
	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getSigla() {
		return sigla;
	}

	public void setSigla(String sigla) {
		this.sigla = sigla;
	}

	public Integer getDdi() {
		return ddi;
	}

	public void setDdi(Integer ddi) {
		this.ddi = ddi;
	}
}