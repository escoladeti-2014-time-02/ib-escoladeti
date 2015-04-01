package br.unicesumar.entity;

import javax.persistence.Entity;
import javax.persistence.OneToOne;

@Entity
public class EmpresaTurma extends EntidadeBase {

	/**
	 * 
	 */
	private static final long serialVersionUID = 3915455856057458470L;

	@OneToOne(orphanRemoval = false)
	private Empresa empresa;

	@OneToOne(orphanRemoval = false)
	private Turma turma;

	private Integer vagas;

	/*
	 * GETTERS E SETTERS
	 */
	public Empresa getEmpresa() {
		return empresa;
	}

	public void setEmpresa(Empresa empresa) {
		this.empresa = empresa;
	}

	public Turma getTurma() {
		return turma;
	}

	public void setTurma(Turma turma) {
		this.turma = turma;
	}

	public Integer getVagas() {
		return vagas;
	}

	public void setVagas(Integer vagas) {
		this.vagas = vagas;
	}
}