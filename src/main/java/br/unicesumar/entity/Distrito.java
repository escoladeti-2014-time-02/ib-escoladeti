package br.unicesumar.entity;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@Entity
public class Distrito extends Cidade {
	/**
	 * 
	 */
	private static final long serialVersionUID = -3711572465288089590L;

	@Temporal(TemporalType.DATE)
	private Date inicioVigencia;

	@Temporal(TemporalType.DATE)
	private Date fimVigencia;

	@ManyToOne(optional = false)
	private Cidade cidade;

	public Distrito() {
	}

	/*
	 * GETTERS E SETTERS
	 */
	public void setInicioVigencia(Date inicioVigencia) {
		this.inicioVigencia = inicioVigencia;
	}
	 
	public void setFimVigencia(Date fimVigencia) {
		this.fimVigencia = fimVigencia;
	}
	 
	public Date getInicioVigencia() {
		return this.inicioVigencia;
	}
	 
	public Date getFimVigencia() {
		return this.fimVigencia;
	}

	public Cidade getCidade() {
		return cidade;
	}

	public void setCidade(Cidade cidade) {
		this.cidade = cidade;
	}	 
}
