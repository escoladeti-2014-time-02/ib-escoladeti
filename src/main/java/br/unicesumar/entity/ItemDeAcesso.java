package br.unicesumar.entity;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
 public class ItemDeAcesso extends EntidadeBase {
	
	private static final long serialVersionUID = -8507157782360786307L;

	@NotNull
	@Size(min = 4, max = 72)
	private String nome;
	
	@JsonIgnore
	@OneToMany
	private List<ItemPerfilDeAcesso> itensPerfilDeAcesso;
	
	/*
	 * GETTERS E SETTERS
	 */
	public List<ItemPerfilDeAcesso> getItensPerfilDeAcesso() {
		return itensPerfilDeAcesso;
	}

	public void setItensPerfilDeAcesso(List<ItemPerfilDeAcesso> itensPerfilDeAcesso) {
		this.itensPerfilDeAcesso = itensPerfilDeAcesso;
	}

	public ItemDeAcesso() {
	}	 

	public void setNome(String nome) {
		this.nome = nome;
	}
	 
	public String getNome() {
		return this.nome;
	}
	 
}