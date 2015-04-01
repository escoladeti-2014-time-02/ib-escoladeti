package br.unicesumar.entity;

import javax.persistence.Entity;
import javax.persistence.Enumerated;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@JsonIgnoreProperties(ignoreUnknown = true)
public class DadosSocioEconomicos extends EntidadeBase {
	/**
	 * 
	 */
	private static final long serialVersionUID = 4567822409634501330L;

	@JsonIgnore
	@Enumerated
	private EscolaridadeResponsavel escolaridadeResponsavel;

	@NotNull
	private Boolean moraComResponsavel;
	
	private String beneficioSocial;
	
	private Integer numeroResidentesNaCasa;
	
	private Integer quantasPessoasTrabalham;
	
	@NotNull
	private Boolean auxilioGovernamental;
	
	private Double valorBeneficio;
	
	@JsonIgnore
	private String serieEscolarResponsavel;

	@JsonIgnore
	private Boolean responsavelCartaoBeneficio;

	private Double rendaFamiliar;

	@JsonIgnore
	private Boolean responsavelPeloSustento;

	@JsonIgnore
	private Boolean programaDigitandoFuturo;

	private Double rendaPerCapita;

	public DadosSocioEconomicos() {
	}
	
	/*
	 * GETTERS E SETTERS
	 */
	public EscolaridadeResponsavel getEscolaridadeResponsavel() {
		return escolaridadeResponsavel;
	}

	public void setEscolaridadeResponsavel(
			EscolaridadeResponsavel escolaridadeResponsavel) {
		this.escolaridadeResponsavel = escolaridadeResponsavel;
	}

	public Boolean getMoraComResponsavel() {
		return moraComResponsavel;
	}

	public void setMoraComResponsavel(Boolean moraComResponsavel) {
		this.moraComResponsavel = moraComResponsavel;
	}

	public String getSerieEscolarResponsavel() {
		return serieEscolarResponsavel;
	}

	public void setSerieEscolarResponsavel(String serieEscolarResponsavel) {
		this.serieEscolarResponsavel = serieEscolarResponsavel;
	}

	public Integer getNumeroResidentesNaCasa() {
		return numeroResidentesNaCasa;
	}

	public void setNumeroResidentesNaCasa(Integer numeroResidentesNaCasa) {
		this.numeroResidentesNaCasa = numeroResidentesNaCasa;
	}

	public Integer getQuantasPessoasTrabalham() {
		return quantasPessoasTrabalham;
	}

	public void setQuantasPessoasTrabalham(Integer quantasPessoasTrabalham) {
		this.quantasPessoasTrabalham = quantasPessoasTrabalham;
	}

	public String getBeneficioSocial() {
		return beneficioSocial;
	}

	public void setBeneficioSocial(String beneficioSocial) {
		this.beneficioSocial = beneficioSocial;
	}

	public Double getValorBeneficio() {
		return valorBeneficio;
	}

	public void setValorBeneficio(Double valorBeneficio) {
		this.valorBeneficio = valorBeneficio;
	}

	public Boolean getResponsavelCartaoBeneficio() {
		return responsavelCartaoBeneficio;
	}

	public void setResponsavelCartaoBeneficio(Boolean responsavelCartaoBeneficio) {
		this.responsavelCartaoBeneficio = responsavelCartaoBeneficio;
	}

	public Boolean getResponsavelPeloSustento() {
		return responsavelPeloSustento;
	}

	public void setResponsavelPeloSustento(Boolean responsavelPeloSustento) {
		this.responsavelPeloSustento = responsavelPeloSustento;
	}

	public Boolean getProgramaDigitandoFuturo() {
		return programaDigitandoFuturo;
	}

	public void setProgramaDigitandoFuturo(Boolean programaDigitandoFuturo) {
		this.programaDigitandoFuturo = programaDigitandoFuturo;
	}

	public Boolean getAuxilioGovernamental() {
		return auxilioGovernamental;
	}

	public void setAuxilioGovernamental(Boolean auxilioGovernamental) {
		this.auxilioGovernamental = auxilioGovernamental;
	}

	public Double getRendaPerCapita() {
		return rendaPerCapita;
	}

	public void setRendaPerCapita(Double rendaPerCapita) {
		this.rendaPerCapita = rendaPerCapita;
	}

	public Double getRendaFamiliar() {
		return rendaFamiliar;
	}

	public void setRendaFamiliar(Double rendaFamiliar) {
		this.rendaFamiliar = rendaFamiliar;
	}
}