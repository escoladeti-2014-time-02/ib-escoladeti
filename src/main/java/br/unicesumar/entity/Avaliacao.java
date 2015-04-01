package br.unicesumar.entity;

import java.math.BigDecimal;
import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;

@Entity
public class Avaliacao extends EntidadeBase {
	/**
	 * 
	 */
	private static final long serialVersionUID = -6796482191141226561L;

	@Min(0)
	@Max(100)
	private BigDecimal nota;

	@Temporal(TemporalType.DATE)
	private Date dataAvaliacao;

	private String local;

	/*
	 * GETTERS E SETTERS
	 */

	public BigDecimal getNota() {
		return nota;
	}

	public void setNota(BigDecimal nota) {
		this.nota = nota;
	}

	public Date getDataAvaliacao() {
		return dataAvaliacao;
	}

	public void setDataAvaliacao(Date dataAvaliacao) {
		this.dataAvaliacao = dataAvaliacao;
	}

	public String getLocal() {
		return local;
	}

	public void setLocal(String local) {
		this.local = local;
	}
}