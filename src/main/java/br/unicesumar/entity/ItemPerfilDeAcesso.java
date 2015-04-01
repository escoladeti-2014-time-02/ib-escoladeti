package br.unicesumar.entity;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class ItemPerfilDeAcesso extends EntidadeBase {
		
	private static final long serialVersionUID = -712431202542776469L;

	@JsonIgnore
	@ManyToOne
	private PerfilDeAcesso perfilDeAcesso;
	
	@ManyToOne
	@JoinColumn(name = "itemperfildeacesso_id")
	private ItemDeAcesso itemDeAcesso;
	
	@OneToMany(
		targetEntity  = NivelDeAcesso.class,
		fetch = FetchType.EAGER,
		cascade = {CascadeType.ALL})
	private List<NivelDeAcesso> niveisDeAcesso;
	

	public ItemPerfilDeAcesso() {
	}


	public PerfilDeAcesso getPerfilDeAcesso() {
		return perfilDeAcesso;
	}


	public void setPerfilDeAcesso(PerfilDeAcesso perfilDeAcesso) {
		this.perfilDeAcesso = perfilDeAcesso;
	}


	public ItemDeAcesso getItemDeAcesso() {
		return itemDeAcesso;
	}


	public void setItemDeAcesso(ItemDeAcesso itemDeAcesso) {
		this.itemDeAcesso = itemDeAcesso;
	}


	public List<NivelDeAcesso> getNiveisDeAcesso() {
		return niveisDeAcesso;
	}


	public void setNiveisDeAcesso(List<NivelDeAcesso> niveisDeAcesso) {
		this.niveisDeAcesso = niveisDeAcesso;
	}
	
	
}
