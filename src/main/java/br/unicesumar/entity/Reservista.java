package br.unicesumar.entity;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;

@Entity
public class Reservista extends Documento {

	/**
	 * 
	 */
	private static final long serialVersionUID = 4531760793529380563L;
	@Enumerated(EnumType.STRING)
	private SituacaoReservista situacaoReservista;

	/*
	 * GETTERS E SETTERS
	 */
	public SituacaoReservista getSituacaoReservista() {
		return situacaoReservista;
	}

	public void setSituacaoReservista(SituacaoReservista situacaoReservista) {
		this.situacaoReservista = situacaoReservista;
	}
}
