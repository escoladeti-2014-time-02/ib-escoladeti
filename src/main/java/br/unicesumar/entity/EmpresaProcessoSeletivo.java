package br.unicesumar.entity;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.validation.constraints.Min;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
@Entity
public class EmpresaProcessoSeletivo extends EntidadeBase {
	/**
	 * 
	 */
	private static final long serialVersionUID = -5777775285075336016L;

	@ManyToOne
	private ProcessoSeletivo processoSeletivo;

	@Min(0)
	private Integer quantidadeVagas;

	@OneToOne
	private Empresa empresa;

	/*
	 * GETTERS E SETTERS
	 */
	public Integer getQuantidadeVagas() {
		return quantidadeVagas;
	}

	public void setQuantidadeVagas(Integer quantidadeVagas) {
		this.quantidadeVagas = quantidadeVagas;
	}

	public Empresa getEmpresa() {
		return empresa;
	}

	public void setEmpresa(Empresa empresa) {
		this.empresa = empresa;
	}

	public ProcessoSeletivo getProcessoSeletivo() {
		return processoSeletivo;
	}

	public void setProcessoSeletivo(ProcessoSeletivo processoSeletivo) {
		this.processoSeletivo = processoSeletivo;
	}
}