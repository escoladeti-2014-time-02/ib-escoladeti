package br.unicesumar.entity;

import javax.persistence.Column;
import javax.persistence.Entity;

@Entity
public class TituloEleitor extends Documento {

	/**
	 * 
	 */
	private static final long serialVersionUID = 5868955547017717512L;

	@Column
	private String zona;

	@Column
	private String secao;

	public String getZona() {
		return zona;
	}

	public void setZona(String zona) {
		this.zona = zona;
	}

	public String getSecao() {
		return secao;
	}

	public void setSecao(String secao) {
		this.secao = secao;
	}
}