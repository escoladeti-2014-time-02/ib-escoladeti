package br.unicesumar.entity;

import java.util.Date;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Inheritance(strategy = InheritanceType.JOINED)
public class Cidade extends EntidadeBase {
	/**
	 * 
	 */
	private static final long serialVersionUID = 7980365901383594366L;

	@NotNull
	@Size(min = 3, max=72)
	private String nome;
  
	@Size(min = 2, max=3)
	private Short ddd;
	
	@NotNull
	@Size(max = 3)
	private String sigla;

	@Temporal(TemporalType.DATE)
	private Date dataFundacao;

	@JsonIgnore
	@OneToMany(mappedBy = "cidade")
	private List<Distrito> distritos;

	@ManyToOne
	private UnidadeFederativa unidadeFederativa;

	@JsonIgnore
	@OneToMany(mappedBy = "cidade")
	private List<Bairro> bairros;
	
	/*
	 * GETTERS E SETTERS
	 */
	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public Short getDdd() {
		return ddd;
	}

	public void setDdd(Short ddd) {
		this.ddd = ddd;
	}

	public String getSigla() {
		return sigla;
	}

	public void setSigla(String sigla) {
		this.sigla = sigla;
	}

	public Date getDataFundacao() {
		return dataFundacao;
	}

	public void setDataFundacao(Date dataFundacao) {
		this.dataFundacao = dataFundacao;
	}

	public List<Distrito> getDistritos() {
		return distritos;
	}

	public void setDistritos(List<Distrito> distritos) {
		this.distritos = distritos;
	}

	public UnidadeFederativa getUnidadeFederativa() {
		return unidadeFederativa;
	}

	public void setUnidadeFederativa(UnidadeFederativa unidadeFederativa) {
		this.unidadeFederativa = unidadeFederativa;
	}

	public List<Bairro> getBairros() {
		return bairros;
	}

	public void setBairros(List<Bairro> bairros) {
		this.bairros = bairros;
	}
}