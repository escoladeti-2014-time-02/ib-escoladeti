package br.unicesumar.entity;

import javax.persistence.Entity;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonSubTypes.Type;
import com.fasterxml.jackson.annotation.JsonTypeInfo;

@Entity
@Inheritance(strategy = InheritanceType.JOINED)
@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, include = JsonTypeInfo.As.PROPERTY, property = "type")
@JsonSubTypes(
		{@Type(value = CertidaoNascimento.class, name = "certidaoNascimento"),
		 @Type(value = Cpf.class, name = "cpf"),
		 @Type(value = CarteiraTrabalho.class, name = "carteiraTrabalho"), 
		 @Type(value = Rg.class, name = "rg"), 
		 @Type(value = TituloEleitor.class, name = "tituloEleitor"),
		 @Type(value = RegistroNacional.class, name = "registroNacional"),
		 @Type(value = CarteiraHabilitacao.class, name = "carteiraHabilitacao")
		}
)
public abstract class Documento extends EntidadeBase {
	/**
	 * 
	 */
	private static final long serialVersionUID = -55144829494540042L;

	private String numero;

	/*
	 * GETTERS E SETTERS
	 */
	public String getNumero() {
		return numero;
	}

	public void setNumero(String numero) {
		this.numero = numero;
	}
}