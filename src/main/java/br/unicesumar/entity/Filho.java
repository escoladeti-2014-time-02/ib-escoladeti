package br.unicesumar.entity;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@JsonIgnoreProperties(ignoreUnknown = true)
public class Filho extends EntidadeBase {
	/**
	 * 
	 */
	private static final long serialVersionUID = -6584630028793629902L;

	@NotNull
	private String nome;

	@Temporal(TemporalType.DATE)
	private Date dataNascimento;

	private boolean moraJunto;

	public Filho() {
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public Date getDataNascimento() {
		return dataNascimento;
	}

	public void setDataNascimento(Date dataNascimento) {
		this.dataNascimento = dataNascimento;
	}

	public boolean isMoraJunto() {
		return moraJunto;
	}

	public void setMoraJunto(boolean moraJunto) {
		this.moraJunto = moraJunto;
	}
}