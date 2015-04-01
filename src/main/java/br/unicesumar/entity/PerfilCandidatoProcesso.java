package br.unicesumar.entity;

import javax.persistence.Entity;
import javax.validation.constraints.Min;

@Entity
public class PerfilCandidatoProcesso extends EntidadeBase {
	/**
	 * 
	 */
	private static final long serialVersionUID = 5523581770587565802L;

	@Min(0)
	private Integer idadeMinima;

	@Min(0)
	private Integer idadeMaxima;

	@Min(0)
	private Double rendaMinima;

	@Min(0)
	private Double rendaMaxima;

	/*
	 * GETTERS E SETTERS
	 */
	public Integer getIdadeMinima() {
		return (idadeMinima != null ? idadeMinima : 0);
	}

	public void setIdadeMinima(Integer idadeMinima) {
		this.idadeMinima = idadeMinima;
	}

	public Integer getIdadeMaxima() {
		return (idadeMaxima != null ? idadeMaxima : 30);
	}

	public void setIdadeMaxima(Integer idadeMaxima) {
		this.idadeMaxima = idadeMaxima;
	}

	public Double getRendaMinima() {
		return (rendaMinima != null ? rendaMinima : new Double("1"));
	}

	public void setRendaMinima(Double rendaMinima) {
		this.rendaMinima = rendaMinima;
	}

	public Double getRendaMaxima() {
		return (rendaMaxima != null ? rendaMaxima : new Double("10000"));
	}

	public void setRendaMaxima(Double rendaMaxima) {
		this.rendaMaxima = rendaMaxima;
	}
}