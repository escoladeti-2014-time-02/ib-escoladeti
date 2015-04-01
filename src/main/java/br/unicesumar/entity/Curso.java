 package br.unicesumar.entity;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.validation.constraints.NotNull;

@Entity
public class Curso extends EntidadeBase {
	/**
	 * 
	 */
	private static final long serialVersionUID = 4399271912813676626L;

	@NotNull
	private String nome;

	@Column
	private String descricao;

	@JoinTable(name = "curso_modulo")
	@ManyToMany
	private List<Modulo> modulo;

	/*
	 * GETTERS and SETTERS
	 */
	public String getDescricao() {
		return descricao;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}

	public List<Modulo> getModulos() {
		return modulo;
	}

	public void setModulos(List<Modulo> modulos) {
		this.modulo = modulos;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}
}