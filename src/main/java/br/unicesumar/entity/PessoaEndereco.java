package br.unicesumar.entity;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.OneToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@Entity
public class PessoaEndereco extends EntidadeBase {
	/**
	 * 
	 */
	private static final long serialVersionUID = -2255083216121032189L;

	@Temporal(TemporalType.DATE)
	private Date inicioVigencia;

	@Temporal(TemporalType.DATE)
	private Date fimVigencia;

	@OneToOne
	private Endereco endereco;

	/*
	 * GETTERS E SETTERS
	 */
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

	public Endereco getEndereco() {
		return endereco;
	}

	public void setEndereco(Endereco endereco) {
		this.endereco = endereco;
	}
}
