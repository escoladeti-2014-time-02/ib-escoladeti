package br.unicesumar.entity;

import javax.persistence.Entity;

@Entity
public class TipoTelefone extends EntidadeBase {
	/**
	 * 
	 */
	private static final long serialVersionUID = 7558604311753143752L;
	private String descricaoTipo;

	public String getDescricaoTipo() {
		return descricaoTipo;
	}

	public void setDescricaoTipo(String descricaoTipo) {
		this.descricaoTipo = descricaoTipo;
	}
}