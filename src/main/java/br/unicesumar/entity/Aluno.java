package br.unicesumar.entity;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@Entity
public class Aluno extends EntidadeBase {
	private static final long serialVersionUID = 2263714780498843658L;

	@ManyToOne(optional = true)
	private Empresa empresa;

	@ManyToOne(optional = false)
	private Candidato candidato;

	@Temporal(TemporalType.DATE)
	private Date inicioVigencia;

	@Temporal(TemporalType.DATE)
	private Date fimVigencia;

	/*
	 * GETTERS E SETTERS
	 */
	public Empresa getEmpresa() {
		return empresa;
	}

	public void setEmpresa(Empresa emrpesa) {
		this.empresa = emrpesa;
	}

	public Candidato getCandidato() {
		return candidato;
	}

	public void setCandidato(Candidato candidato) {
		this.candidato = candidato;
	}

	public Date getInicioVigencia() {
		return inicioVigencia;
	}

	public void setInicioVigencia(Date inicioVigencia) {
		this.inicioVigencia = inicioVigencia;
	}

	public Date getFimVigencia() {
		return fimVigencia;
	}

	public void setFimVigencia(Date fimVigencia) {
		this.fimVigencia = fimVigencia;
	}

	public boolean isNovo() {
		return this.getId() == null;
	}
}