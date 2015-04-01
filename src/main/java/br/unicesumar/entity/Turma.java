package br.unicesumar.entity;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@JsonIgnoreProperties(ignoreUnknown = true)
public class Turma extends EntidadeBase {
	/**
	 * 
	 */
	private static final long serialVersionUID = -6925702006290312190L;

	public static final String DATA_INICIO = "dataInicio";

	@NotNull
	private String nome;

	private String observacao;

	@ManyToOne(optional = false)
	private Curso curso;

	@JoinTable(name = "turma_aluno")
	@ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private List<Aluno> aluno;

	@JoinTable(name = "empresaturma_turma")
	@OneToMany(cascade = CascadeType.ALL)
	private List<EmpresaTurma> empresaTurma;

	@NotNull
	@Temporal(TemporalType.DATE)
	private Date dataInicio;

	@NotNull
	@Temporal(TemporalType.DATE)
	private Date dataEncerramento;

	public Turma() {
		aluno = new ArrayList<Aluno>();
		curso = new Curso();
	}

	/*
	 * GETTERS E SETTERS
	 */
	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getObservacao() {
		return observacao;
	}

	public void setObservacao(String observacao) {
		this.observacao = observacao;
	}

	public Curso getCurso() {
		return curso;
	}

	public void setCurso(Curso curso) {
		this.curso = curso;
	}

	public List<Aluno> getAluno() {
		return aluno;
	}

	public void setAluno(List<Aluno> aluno) {
		this.aluno = aluno;
	}

	public List<EmpresaTurma> getEmpresaTurma() {
		return empresaTurma;
	}

	public void setEmpresaTurma(List<EmpresaTurma> empresasTurma) {
		this.empresaTurma = empresasTurma;
	}

	public Date getDataInicio() {
		return dataInicio;
	}

	public void setDataInicio(Date dataInicio) {
		this.dataInicio = dataInicio;
	}

	public Date getDataEncerramento() {
		return dataEncerramento;
	}

	public void setDataEncerramento(Date dataEncerramento) {
		this.dataEncerramento = dataEncerramento;
	}

}