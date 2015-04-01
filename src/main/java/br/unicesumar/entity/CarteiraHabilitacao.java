package br.unicesumar.entity;

import java.util.List;

import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.JoinTable;


@Entity
public class CarteiraHabilitacao extends Documento {

	/**
	 * 
	 */
	private static final long serialVersionUID = 7743431166256866810L;
	
	
	@ElementCollection(fetch = FetchType.LAZY, targetClass = CategoriaHabilitacao.class)     
	@Enumerated(EnumType.STRING)     
	@JoinTable(name = "carteiraHabilitacao_categoriasHabilitacao") 
	private List<CategoriaHabilitacao> categoriasHabilitacao;

	
	
	/*
	 * GETTERS E SETTERS
	 */
	public List<CategoriaHabilitacao> getCategoriasHabilitacao() {
		return categoriasHabilitacao;
	}

	public void setCategoriasHabilitacao(
			List<CategoriaHabilitacao> categoriasHabilitacao) {
		this.categoriasHabilitacao = categoriasHabilitacao;
	}
}