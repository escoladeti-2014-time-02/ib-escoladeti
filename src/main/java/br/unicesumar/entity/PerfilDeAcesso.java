package br.unicesumar.entity;

import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.OneToMany;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Entity
public class PerfilDeAcesso extends EntidadeBase {
	
	private static final long serialVersionUID = -1165027226066840865L;

	@NotNull
	@Size(min = 4, max = 39)
	private String nome;

	@OneToMany(
		targetEntity = ItemPerfilDeAcesso.class,
		fetch = FetchType.EAGER,
		cascade = {CascadeType.ALL})
	private Set<ItemPerfilDeAcesso> itensPerfilDeAcesso;
	
	/*
	 * GETTERS E SETTERS
	 */
	public PerfilDeAcesso() {
	}
	
	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public Set<ItemPerfilDeAcesso> getItensPerfilDeAcesso() {
		return itensPerfilDeAcesso;
	}

	public void setItensPerfilDeAcesso(Set<ItemPerfilDeAcesso> itensPerfilDeAcesso) {
		this.itensPerfilDeAcesso = itensPerfilDeAcesso;
	}
}