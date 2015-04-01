package br.unicesumar.entity;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.OneToMany;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Entity
@Inheritance(strategy = InheritanceType.JOINED)
public class Pessoa extends EntidadeBase {
	
	private static final long serialVersionUID = -1530585667712732743L;

	@Size(min = 4, max = 72)
	private String nome;
	
	private String email;

	@NotNull
	private Boolean ativo;

	@OneToMany(cascade = CascadeType.ALL, fetch =  FetchType.EAGER)
	private Set<Endereco> enderecos;

	@OneToMany(cascade = CascadeType.ALL)
	private List<Documento> documentos;
	
	@OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	private List<Telefone> telefones;

	public Pessoa() {
		this.ativo = true;
		this.documentos = new ArrayList<Documento>();
		this.enderecos = new HashSet<Endereco>();
	}

	/*
	 * GETTERS E SETTERS
	 */
	public Boolean getAtivo() {
		return ativo;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}
	
	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public void setAtivo(Boolean ativo) {
		this.ativo = ativo;
	}

	public List<Documento> getDocumentos() {
		return documentos;
	}

	public void setDocumentos(List<Documento> documentos) {
		this.documentos = documentos;
	}

	public Set<Endereco> getEnderecos() {
		return enderecos;
	}

	public void setEnderecos(Set<Endereco> enderecos) {
		this.enderecos = enderecos;
	}
	
	public List<Telefone> getTelefones() {
		return telefones;
	}

	public void setTelefones(List<Telefone> telefones) {
		this.telefones = telefones;
	}
}