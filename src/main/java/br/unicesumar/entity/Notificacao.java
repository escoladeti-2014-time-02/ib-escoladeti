package br.unicesumar.entity;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@Entity
public class Notificacao extends EntidadeBase {
	/**
	 * 
	 */
	private static final long serialVersionUID = -4507798512592571995L;

	@Temporal(TemporalType.TIMESTAMP)
	private Date dataHora;

	private String observacao;

	public Date getDataHora() {
		return dataHora;
	}

	public void setDataHora(Date dataHora) {
		this.dataHora = dataHora;
	}

	public String getObservacao() {
		return observacao;
	}

	public void setObservacao(String observacao) {
		this.observacao = observacao;
	}
}