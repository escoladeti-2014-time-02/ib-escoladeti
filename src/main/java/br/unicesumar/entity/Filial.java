package br.unicesumar.entity;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;

@Entity
public class Filial extends Empresa {
	/**
	 * 
	 */
	private static final long serialVersionUID = -730872075714791194L;

	@ManyToOne(optional = false)
	private Empresa empresa;

	/*
	 * GETTERS E SETTERS
	 */
	
	public Empresa getEmpresa() {
		return empresa;
	}

	public void setEmpresa(Empresa empresa) {
		this.empresa = empresa;
	}

}