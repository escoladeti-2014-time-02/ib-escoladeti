package br.unicesumar.entity;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@Entity
public class UsuarioPerfilAcesso extends EntidadeBase {
	/**
	 * 
	 */
	private static final long serialVersionUID = -211556936289472489L;

	@Temporal(TemporalType.DATE)
	private Date inicioVigencia;
	 
	@Temporal(TemporalType.DATE)
	private Date fimVigencia;

	public UsuarioPerfilAcesso() {
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
}