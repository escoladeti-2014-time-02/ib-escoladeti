package br.unicesumar.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@Entity
@Inheritance(strategy = InheritanceType.JOINED)
public class PessoaJuridica extends Pessoa {
	/**
	 * 
	 */
	private static final long serialVersionUID = 6134533363004475160L;

	@Column(unique = true, nullable = false)
	private String cnpj;

	@Column(unique = true, nullable = false)
	private String inscricaoEstadual;
	
	//@Column(nullable = false)
	private String razaoSocial;
	
	//@Column(nullable = false)
	private String fantasia;

	@Temporal(TemporalType.DATE)
	private Date dataConstituicao;

	public PessoaJuridica() {
	}
	
	/*
	 * GETTERS E SETTERS
	 */
	public String getCnpj() {
		return cnpj;
	}

	public void setCnpj(String cnpj) {
		this.cnpj = cnpj;
	}

	public String getInscricaoEstadual() {
		return inscricaoEstadual;
	}

	public void setInscricaoEstadual(String inscricaoEstadual) {
		this.inscricaoEstadual = inscricaoEstadual;
	}

	public Date getDataConstituicao() {
		return dataConstituicao;
	}

	public void setDataConstituicao(Date dataConstituicao) {
		this.dataConstituicao = dataConstituicao;
	}

	public String getRazaoSocial() {
		return razaoSocial;
	}

	public void setRazaoSocial(String razaoSocial) {
		this.razaoSocial = razaoSocial;
	}

	public String getFantasia() {
		return fantasia;
	}

	public void setFantasia(String fantasia) {
		this.fantasia = fantasia;
	}
}