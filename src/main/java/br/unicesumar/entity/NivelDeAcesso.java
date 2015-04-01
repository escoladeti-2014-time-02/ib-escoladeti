package br.unicesumar.entity;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class NivelDeAcesso extends EntidadeBase {
	
	private static final long serialVersionUID = -4462598624503372646L;

	@JsonIgnore
	@ManyToOne
	private ItemPerfilDeAcesso itemPerfilDeAcesso;
	
	@Enumerated(EnumType.STRING)
	private TipoNivelDeAcesso nivel;
	
	private Boolean selected;

	public NivelDeAcesso() {
	}

	public TipoNivelDeAcesso getNivel() {
		return nivel;
	}

	public void setNivel(TipoNivelDeAcesso nivel) {
		this.nivel = nivel;
	}

	public Boolean getSelected() {
		return selected;
	}

	public void setSelected(Boolean selected) {
		this.selected = selected;
	}

	public ItemPerfilDeAcesso getItemPerfilDeAcesso() {
		return itemPerfilDeAcesso;
	}

	public void setItensPerfilDeAcesso(ItemPerfilDeAcesso itemPerfilDeAcesso) {
		this.itemPerfilDeAcesso = itemPerfilDeAcesso;
	}
	
	
}