package br.unicesumar.entity;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@JsonIgnoreProperties(ignoreUnknown = true)
public class Colaborador extends EntidadeBase {
	private static final long serialVersionUID = 3673258570377524584L;

	@JoinColumn(name = "pessoafisica_id")
	@OneToOne(optional = false)
	private PessoaFisica pessoaFisica;

	/*
	 * GETTERS e SETTERS
	 */
	public PessoaFisica getPessoaFisica() {
		return pessoaFisica;
	}

	public void setPessoaFisica(PessoaFisica pessoaFisica) {
		this.pessoaFisica = pessoaFisica;
	}
}