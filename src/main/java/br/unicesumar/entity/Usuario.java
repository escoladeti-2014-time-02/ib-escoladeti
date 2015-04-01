package br.unicesumar.entity;

import static br.unicesumar.util.nvl.NvlUtil.nvlToEmpty;
import static liquibase.util.MD5Util.computeMD5;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@JsonIgnoreProperties(ignoreUnknown = true)
public class Usuario extends EntidadeBase {
	/**
	 *
	 */
	private static final long serialVersionUID = -2593822985932760858L;

	@NotNull
	@Size(min = 4, max = 39)
	private String login;

	@NotNull
	private String senha;

	@JsonIgnore
	@NotNull
	private Boolean ativo;
	
	@JsonIgnore
	@Temporal(TemporalType.DATE)
	private Date dataCadastro;

	@ManyToOne
	private PerfilDeAcesso perfilDeAcesso;

	public Usuario() {
		this.ativo = true;
		this.dataCadastro = new Date();
	}

	/*
	 * GETTERS E SETTERS
	 */
	public String getLogin() {
		return login;
	}

	public void setLogin(String login) {
		this.login = login;
	}

	public String getSenha() {
		return senha;
	}

	public void setSenha(String senha) {
		this.senha = computeMD5(nvlToEmpty(senha));
	}

	public Boolean getAtivo() {
		return ativo;
	}

	public void setAtivo(Boolean ativo) {
		this.ativo = ativo;
	}

	public Date getDataCadastro() {
		return dataCadastro;
	}

	public void setDataCadastro(Date dataCadastro) {
		this.dataCadastro = dataCadastro;
	}

	public void setPerfilAcesso(PerfilDeAcesso perfilDeAcesso) {
		this.perfilDeAcesso = perfilDeAcesso;
	}
	
	public PerfilDeAcesso getPerfilAcesso(){
		return this.perfilDeAcesso;
	}
}