package br.unicesumar.entity;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Entity
public class Logradouro extends EntidadeBase {
	/**
	 * 
	 */
	private static final long serialVersionUID = -7685031551902556534L;
   
	@NotNull
	@Size(min = 3, max=72)
	private String nome;

	@ManyToOne(fetch = FetchType.EAGER)
	private TipoLogradouro tipoLogradouro;

	@OneToMany(mappedBy = "logradouro", fetch = FetchType.EAGER, cascade = { CascadeType.ALL })
	private List<FaixaDeCep> faixasDeCep;

	public Logradouro() {
		this.faixasDeCep = new ArrayList<FaixaDeCep>();
	}

	/*
	 * GETTERS E SETTERS
	 */
	public String getNome() {
		return nome;
	}
	
	public void setNome(String nome) {
		this.nome = nome;
	}

	public TipoLogradouro getTipoLogradouro() {
		return tipoLogradouro;
	}
	
	public void setTipoLogradouro(TipoLogradouro tipoLogradouro) {
		this.tipoLogradouro = tipoLogradouro;
	}

	public List<FaixaDeCep> getFaixasDeCep() {
		return faixasDeCep;
	}

	public void setFaixasDeCep(List<FaixaDeCep> faixasDeCep) {
		this.faixasDeCep = faixasDeCep;
	}
}