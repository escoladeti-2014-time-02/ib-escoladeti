package br.unicesumar.entity;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;

@Entity
public class CandidatoProcessoSeletivo extends EntidadeBase {
	/**
	 *
	 */
	private static final long serialVersionUID = 8445655988793780537L;

	@JoinColumn(name = "processoseletivo_id", referencedColumnName = "id")
	@ManyToOne
	private ProcessoSeletivo processoSeletivo;

	@JoinColumn(name = "candidato_id", referencedColumnName = "id")
	@OneToOne(orphanRemoval = false)
	private Candidato candidato;

	@Enumerated
	private NivelCandidatoProcesso nivelCandidatoProcesso;

	@JoinColumn(name = "avaliacao_id", referencedColumnName = "id")
	@OneToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER, orphanRemoval = true)
	private Avaliacao avaliacao;

	@JoinColumn(name = "entrevista_id", referencedColumnName = "id")
	@OneToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER, orphanRemoval = true)
	private Entrevista entrevista;

	@ManyToMany(fetch = FetchType.LAZY)
	private List<Notificacao> notificacoes;

	/*
	 * GETTERS E SETTERS
	 */
	public Candidato getCandidato() {
		return candidato;
	}

	public void setCandidato(Candidato candidato) {
		this.candidato = candidato;
	}

	public NivelCandidatoProcesso getNivelCandidatoProcesso() {
		return nivelCandidatoProcesso;
	}

	public void setNivelCandidatoProcesso(
			NivelCandidatoProcesso nivelCandidatoProcesso) {
		this.nivelCandidatoProcesso = nivelCandidatoProcesso;
	}

	public Avaliacao getAvaliacao() {
		return avaliacao;
	}

	public void setAvaliacao(Avaliacao avaliacao) {
		this.avaliacao = avaliacao;
	}

	public List<Notificacao> getNotificacoes() {
		return notificacoes;
	}

	public void setNotificacoes(List<Notificacao> notificacoes) {
		this.notificacoes = notificacoes;
	}

	public ProcessoSeletivo getProcessoSeletivo() {
		return processoSeletivo;
	}

	public void setProcessoSeletivo(ProcessoSeletivo processoSeletivo) {
		this.processoSeletivo = processoSeletivo;
	}

	public Entrevista getEntrevista() {
		return entrevista;
	}

	public void setEntrevista(Entrevista entrevista) {
		this.entrevista = entrevista;
	}
}