package br.unicesumar.entity;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.JoinTable;


@Entity
public class Idioma extends EntidadeBase {

	/**
	 * 
	 */
	private static final long serialVersionUID = -1829409668646750679L;

	@Column(nullable = false)
	private String descricao;

	@ElementCollection(fetch = FetchType.LAZY, targetClass = DiaAulaTeorica.class)     
	@Enumerated(EnumType.STRING)     
	@JoinTable(name = "idioma_fluenciaIdioma") 
	private List<FluenciaIdioma> fluenciaIdioma;
	
	/*
	 * GETTERS E SETTERS
	 */

	public String getDescricao() {
		return descricao;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}

	public List<FluenciaIdioma> getFluenciaIdioma() {
		return fluenciaIdioma;
	}

	public void setFluenciaIdioma(List<FluenciaIdioma> fluenciaIdioma) {
		this.fluenciaIdioma = fluenciaIdioma;
	}
	

}