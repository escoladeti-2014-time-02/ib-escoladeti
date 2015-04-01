package br.unicesumar.entity;

import javax.persistence.Entity;
import javax.persistence.Enumerated;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.validation.constraints.Size;

@Entity
@Inheritance(strategy = InheritanceType.JOINED)
public class PessoaFisica extends Pessoa {
	/**
	 *
	 */
	private static final long serialVersionUID = 2545230975534146646L;

	@Size(min=3, max=72)
	private String profissao;

	@Enumerated
	private Sexo sexo;

	@Enumerated
	private EstadoCivil estadoCivil;

	public PessoaFisica() {
	}
	/*
	 * GETTERS E SETTERS
	 */
	public Sexo getSexo() {
		return sexo;
	}

	public String getProfissao() {
		return profissao;
	}

	public void setProfissao(String profissao) {
		this.profissao = profissao;
	}

	public EstadoCivil getEstadoCivil() {
		return estadoCivil;
	}

	public void setEstadoCivil(EstadoCivil estadoCivil) {
		this.estadoCivil = estadoCivil;
	}

	public void setSexo(Sexo sexo) {
		this.sexo = sexo;
	}

	public boolean isNew() {
		return getId() == null;
	}
}
