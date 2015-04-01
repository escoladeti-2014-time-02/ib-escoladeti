package br.unicesumar.entity;

import javax.persistence.Column;
import javax.persistence.Entity;

@Entity
public class TipoLogradouro extends EntidadeBase {
	/**
	 * 
	 */
	private static final long serialVersionUID = -2601088778174311339L;
	@Column
	private String nome;

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}
}