package br.unicesumar.entity;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
 

@Entity
public class UnidadeFederativa extends EntidadeBase {
	/**
	 * 
	 */
	private static final long serialVersionUID = -4083237713057312919L;
   
	@NotNull
	@Size(min = 3, max=72)
	private String nome;

	@NotNull
	@Size(max = 3)
	private String sigla;

	@ManyToOne
	private Pais pais;

	public UnidadeFederativa() {

	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getSigla() {
		return sigla;
	}

	public void setSigla(String sigla) {
		this.sigla = sigla;
	}

	public Pais getPais() {
		return pais;
	}

	public void setPais(Pais pais) {
		this.pais = pais;
	}
}