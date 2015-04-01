package br.unicesumar.entity;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.OneToMany;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@JsonIgnoreProperties(ignoreUnknown = true)
public class InstituicaoEnsino extends EntidadeBase {
	/**
	 * 
	 */
	private static final long serialVersionUID = -3814181768660673371L;

	@Column(nullable = false)
	private String nome;

	@NotNull
	@OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	private List<Telefone> telefones;
	
	@NotNull
	@OneToMany(cascade = CascadeType.ALL)
	private List<Endereco> enderecos;

	public InstituicaoEnsino() {
	}

	/*
	 * GETTERS E SETTERS
	 */
	public List<Telefone> getTelefones() {
		return telefones;
	}

	public void setTelefones(List<Telefone> telefones) {
		this.telefones = telefones;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public List<Endereco> getEnderecos() {
		return enderecos;
	}

	public void setEnderecos(List<Endereco> enderecos) {
		this.enderecos = enderecos;
	}
	
}