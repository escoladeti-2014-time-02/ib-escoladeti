package br.unicesumar.entity;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Evento extends EntidadeBase {
	private static final long serialVersionUID = -7890334430435805697L;

	@NotNull
	private String titulo;
	
	@NotNull
	@Temporal(TemporalType.TIMESTAMP)
	private Date dataEvento;

	@ManyToOne
	private TipoEvento tipoEvento;

	private String descricaoEvento;
	
	@JsonIgnore
	@ManyToOne
	private Candidato candidato;

	public Evento() {
		this.candidato = new Candidato();
		this.tipoEvento = new TipoEvento();
	}

	/*
	 * GETTERS E SETTERS
	 */
	public String getTitulo() {
		return titulo;
	}

	public void setTitulo(String titulo) {
		this.titulo = titulo;
	}

	public Date getDataEvento() {
		return dataEvento;
	}

	public void setDataEvento(Date dataEvento) {
		this.dataEvento = dataEvento;
	}

	public TipoEvento getTipoEvento() {
		return tipoEvento;
	}

	public void setTipoEvento(TipoEvento tipoEvento) {
		this.tipoEvento = tipoEvento;
	}
	
	public String getDescricaoEvento() {
		return descricaoEvento;
	}

	public void setDescricaoEvento(String descricaoEvento) {
		this.descricaoEvento = descricaoEvento;
	}

	public Candidato getCandidato() {
		return candidato;
	}

	public void setCandidato(Candidato candidato) {
		this.candidato = candidato;
	}
}