package br.unicesumar.entity;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.validation.constraints.NotNull;

/**
 * @author heidi
 * @author egardin 
 */

@Entity
public class Modulo extends EntidadeBase {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@NotNull
	private String nome;

	@Column
	private String descricao;

	@OneToMany(cascade = CascadeType.ALL, orphanRemoval = true,  mappedBy = "modulo")
	private List<DisciplinaModulo> disciplinasModulo;

	/*
	 * GETTERS and SETTERS
	 */
	public String getDescricao() {
		return descricao;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}

	public List<DisciplinaModulo> getDisciplinasModulo() {
		return disciplinasModulo;
	}

	public void setDisciplinasModulo(List<DisciplinaModulo> disciplinasModulo) {
		this.disciplinasModulo = disciplinasModulo;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}
}
