package br.unicesumar.entity;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;

@Entity
public class Entrevista extends EntidadeBase {
	/**
	 * 
	 */
	private static final long serialVersionUID = -5463652070618737256L;

	@NotNull
	private String descricao;

	@Temporal(TemporalType.DATE)
	private Date datahora;

	/*
	 * GETTERS E SETTERS
	 */
	public Date getDatahora() {
		return datahora;
	}

	public void setDataHora(Date dataHora) {
		this.datahora = dataHora;
	}

	public String getDescricao() {
		return descricao;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}
}