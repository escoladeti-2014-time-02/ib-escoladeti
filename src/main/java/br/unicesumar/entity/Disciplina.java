package br.unicesumar.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.validation.constraints.NotNull;

/**
 * @author Melina
 */
 
@Entity
public class Disciplina extends EntidadeBase {
	private static final long serialVersionUID = 15510811844356419L;

	@NotNull
	private String nome;
	
	@Column
	private String descricao;

	/*
	 * GETTERS and SETTERS
	 */
	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getDescricao() {
		return descricao;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}
	
}
