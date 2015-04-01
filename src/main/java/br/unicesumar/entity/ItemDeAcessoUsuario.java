package br.unicesumar.entity;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@Entity
public class ItemDeAcessoUsuario extends EntidadeBase {
	
	private static final long serialVersionUID = -3315247453768746589L;

	
	@Temporal(TemporalType.DATE)
	private Date inicioVigencia;

	@Temporal(TemporalType.DATE)
	private Date fimVigencia;

	@ManyToOne
	private Usuario usuario;

	@OneToOne
	private ItemDeAcesso itemDeAcesso;

	public ItemDeAcessoUsuario() {
	}

	/*
	 * GETTERS E SETTERS
	 */
	public void setInicioVigencia(Date inicioVigencia) {
		this.inicioVigencia = inicioVigencia;
	}
	 
	public void setFimVigencia(Date fimVigencia) {
		this.fimVigencia = fimVigencia;
	}
	 
	public Date getInicioVigencia() {
		return this.inicioVigencia;
	}

	public Date getFimVigencia() {
		return this.fimVigencia;
	}

	public Usuario getUsuarios() {
		return usuario;
	}

	public void setUsuarios(Usuario usuarios) {
		this.usuario = usuarios;
	}

	public ItemDeAcesso getItemDeAcesso() {
		return itemDeAcesso;
	}

	public void setItemDeAcesso(ItemDeAcesso itemDeAcesso) {
		this.itemDeAcesso = itemDeAcesso;
	}
}