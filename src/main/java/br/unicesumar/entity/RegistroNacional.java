package br.unicesumar.entity;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;

@Entity
public class RegistroNacional extends Documento {

	/**
	 * 
	 */
	private static final long serialVersionUID = -5866067183426552345L;
	@Enumerated(EnumType.STRING)
	private Nacionalidade nacionalidade;

	public Nacionalidade getNacionalidade() {
		return nacionalidade;
	}

	public void setNacionalidade(Nacionalidade nacionalidade) {
		this.nacionalidade = nacionalidade;
	}
}