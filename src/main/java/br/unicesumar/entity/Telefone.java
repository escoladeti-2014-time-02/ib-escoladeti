package br.unicesumar.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.OneToOne;

@Entity
public class Telefone extends EntidadeBase {
	/**
	 * 
	 */
	private static final long serialVersionUID = -8558292224171809978L;

	@Column
	private String numero;
	
	@OneToOne
	private TipoTelefone tipoTelefone;
	
	public Telefone() {
	}
	
	public String getNumero() {
		return numero;
	}

	public void setNumero(String numero) {
		this.numero = numero;
	}

	public TipoTelefone getTipoTelefone() {
		return tipoTelefone;
	}

	public void setTipoTelefone(TipoTelefone tipoTelefone) {
		this.tipoTelefone = tipoTelefone;
	}
}