package br.unicesumar.entity;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;

import br.unicesumar.serializer.StatusProcessoSeletivoDeserializer;
import br.unicesumar.serializer.StatusProcessoSeletivoSerializer;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

@Entity
@JsonIgnoreProperties(ignoreUnknown = true)
public class ProcessoSeletivo extends EntidadeBase {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	public static final String DESCRICAO = "descricao";

	@NotNull
	private String descricao;

	@Temporal(TemporalType.DATE)
	private Date dataInicio;

	@Temporal(TemporalType.DATE)
	private Date dataFim;
	
	@JsonIgnore
	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY,
			   mappedBy = "processoSeletivo", orphanRemoval = true,
			   targetEntity = EmpresaProcessoSeletivo.class)
	private List<EmpresaProcessoSeletivo> empresasParticipantes;

	@Enumerated(EnumType.ORDINAL)
	@JsonSerialize(using = StatusProcessoSeletivoSerializer.class)
	@JsonDeserialize(using = StatusProcessoSeletivoDeserializer.class)
	private StatusProcessoSeletivo statusProcessoSeletivo;

	@JsonIgnore
	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY,
			   orphanRemoval = true, mappedBy = "processoSeletivo")
	private List<CandidatoProcessoSeletivo> candidatosProcessoSeletivo;

	@OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
	private PerfilCandidatoProcesso perfilCandidato;

	public ProcessoSeletivo() {
		this.candidatosProcessoSeletivo = new ArrayList<CandidatoProcessoSeletivo>();
		this.empresasParticipantes = new ArrayList<EmpresaProcessoSeletivo>();
		this.statusProcessoSeletivo = StatusProcessoSeletivo.PRE_SELECAO;
	}
	/*
	 * GETTERS E SETTERS
	 */
	public Date getDataInicio() {
		return dataInicio;
	}

	public void setDataInicio(Date dataInicio) {
		this.dataInicio = dataInicio;
	}

	public Date getDataFim() {
		return dataFim;
	}

	public void setDataFim(Date dataFim) {
		this.dataFim = dataFim;
	}

	public List<EmpresaProcessoSeletivo> getEmpresasParticipantes() {
		return empresasParticipantes;
	}

	public void setEmpresasParticipantes(
			List<EmpresaProcessoSeletivo> empresasParticipantes) {
		this.empresasParticipantes = empresasParticipantes;
	}

	public StatusProcessoSeletivo getStatusProcessoSeletivo() {
		return statusProcessoSeletivo;
	}

	public void setStatusProcessoSeletivo(
			StatusProcessoSeletivo statusProcessoSeletivo) {
		this.statusProcessoSeletivo = statusProcessoSeletivo;
	}

	public List<CandidatoProcessoSeletivo> getCandidatosProcessoSeletivo() {
		return candidatosProcessoSeletivo;
	}

	public void setCandidatosProcessoSeletivo(
			List<CandidatoProcessoSeletivo> candidatosProcessoSeletivo) {
		this.candidatosProcessoSeletivo = candidatosProcessoSeletivo;
	}

	public String getDescricao() {
		return descricao;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}

	public void adicionarEmpresaProcesso(EmpresaProcessoSeletivo empresaProcesso) {
		int index = getIndexEmpresaProcesso(empresaProcesso);

		if(existeEmpresaCadastrada(index)) {
			this.empresasParticipantes.remove(index);
		}
		this.empresasParticipantes.add(empresaProcesso);
	}

	private boolean existeEmpresaCadastrada(int index) {
		return index > -1;
	}

	public int getIndexEmpresaProcesso(EmpresaProcessoSeletivo empresa) {
		for(int i = 0; i < empresasParticipantes.size(); i++) {
			if(empresasParticipantes.get(i).getId().equals(empresa.getId())) {
				return i;
			}
		}
		return -1;
	}

	public EmpresaProcessoSeletivo getEmpresaProcesso(EmpresaProcessoSeletivo empresaProcesso) {
		int index = getIndexEmpresaProcesso(empresaProcesso);

		if(index > -1) {
			return empresasParticipantes.get(index);
		}
		return new EmpresaProcessoSeletivo();
	}

	public PerfilCandidatoProcesso getPerfilCandidato() {
		return perfilCandidato;
	}

	public void setPerfilCandidato(PerfilCandidatoProcesso perfilCandidato) {
		this.perfilCandidato = perfilCandidato;
	}

	public void removerEmpresaProcesso(EmpresaProcessoSeletivo empresaProcesso) {
		int index = getIndexEmpresaProcesso(empresaProcesso);

		if(existeEmpresaCadastrada(index)) {
			this.empresasParticipantes.remove(index);
		}
	}

	public CandidatoProcessoSeletivo adicionarNovoCandidatoProcesso(Candidato candidato, Integer nivel) {
		int index = getIndexCandidatoProcesso(candidato); 

		if(index > -1) {
			return this.candidatosProcessoSeletivo.get(index);
		}

		CandidatoProcessoSeletivo novoCandidato = getNewCandidatoProcessoSeletivo(candidato, nivel);

		this.candidatosProcessoSeletivo.add(novoCandidato);
		novoCandidato.setProcessoSeletivo(this);

		return novoCandidato;
	}

	private int getIndexCandidatoProcesso(Candidato candidato) {
		for(int i = 0; i < this.candidatosProcessoSeletivo.size(); i++) {
			if(this.candidatosProcessoSeletivo.get(i).getCandidato().getId().equals(candidato.getId())) {
				return i;
			}
		}
		return -1;
	}

	private CandidatoProcessoSeletivo getNewCandidatoProcessoSeletivo(Candidato candidato, Integer nivel) {
		CandidatoProcessoSeletivo novoCandidato = new CandidatoProcessoSeletivo();
		novoCandidato.setCandidato(candidato);
		novoCandidato.setNivelCandidatoProcesso(NivelCandidatoProcesso.get(nivel));

		return novoCandidato;
	}
}