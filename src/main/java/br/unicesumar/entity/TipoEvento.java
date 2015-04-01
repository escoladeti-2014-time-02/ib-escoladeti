package br.unicesumar.entity;

import javax.persistence.Entity;
import javax.validation.constraints.NotNull;

@Entity
public class TipoEvento extends EntidadeBase {
	/**
	 * 
	 */
	private static final long serialVersionUID = -7887079382143307313L;

	@NotNull
	private String descricao;

	@NotNull
	private String icone;

	@NotNull
	private String cor;

	/*
	 * GETTERS E SETTERS
	 */
	public String getDescricao() {
		return descricao;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}

	public String getIcone() {
		return icone;
	}

	public void setIcone(String icone) {
		this.icone = icone;
	}

	public String getCor() {
		return cor;
	}

	public void setCor(String cor) {
		this.cor = cor;
	}
}