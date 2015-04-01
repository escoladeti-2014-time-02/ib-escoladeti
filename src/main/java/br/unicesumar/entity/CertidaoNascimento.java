package br.unicesumar.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.OneToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import br.unicesumar.serializer.CustomDateDeserializer;
import br.unicesumar.serializer.CustomDateSerializer;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

@Entity
public class CertidaoNascimento extends Documento {
	/**
	 * 
	 */
	private static final long serialVersionUID = -746121592878172345L;

	@Column
	private String livro;

	@Column
	private String folha;

	@Column
	private String cartorio;

	@OneToOne(optional = true)
	private Cidade origem;

	@JsonDeserialize(using = CustomDateDeserializer.class)
	@JsonSerialize(using = CustomDateSerializer.class)
	@Temporal(TemporalType.DATE)
	@Column(nullable = false)
	private Date dataNascimento;

	public CertidaoNascimento() {
	}

	public String getLivro() {
		return livro;
	}

	public void setLivro(String livro) {
		this.livro = livro;
	}

	public String getFolha() {
		return folha;
	}

	public void setFolha(String folha) {
		this.folha = folha;
	}

	public String getCartorio() {
		return cartorio;
	}

	public void setCartorio(String cartorio) {
		this.cartorio = cartorio;
	}

	public Cidade getOrigem() {
		return origem;
	}

	public void setOrigem(Cidade origem) {
		this.origem = origem;
	}

	public Date getDataNascimento() {
		return dataNascimento;
	}

	public void setDataNascimento(Date dataNascimento) {
		this.dataNascimento = dataNascimento;
	}
}