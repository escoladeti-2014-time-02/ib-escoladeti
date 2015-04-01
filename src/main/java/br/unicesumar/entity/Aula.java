package br.unicesumar.entity;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@Entity
public class Aula extends EntidadeBase {
	/**
	 * 
	 */
	private static final long serialVersionUID = -8732528899091630812L;

	@Column
	@Temporal(TemporalType.DATE)
	private Date dataAula;

	@Column
	private String descricao;

	@ManyToOne
	private Disciplina disciplina;

	@ManyToOne
	private Turma turma;

	@ManyToOne
	private Modulo modulo;
	
	@ManyToOne
	private Colaborador colaborador;

	@OneToMany(cascade = CascadeType.ALL)
	private List<AlunoAula> alunoAula;

	public Aula() {
		this.turma = new Turma();
		this.alunoAula = new ArrayList<AlunoAula>();
	}

	public Date getDataAula() {
		return dataAula;
	}

	public void setDataAula(Date dataAula) {
		this.dataAula = dataAula;
	}

	public String getDescricao() {
		return descricao;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}

	public Disciplina getDisciplina() {
		return disciplina;
	}

	public void setDisciplina(Disciplina disciplina) {
		this.disciplina = disciplina;
	}

	public Turma getTurma() {
		return turma;
	}

	public void setTurma(Turma turma) {
		this.turma = turma;
	}

	public Modulo getModulo() {
		return modulo;
	}

	public void setModulo(Modulo modulo) {
		this.modulo = modulo;
	}

	public List<AlunoAula> getAlunoAula() {
		return alunoAula;
	}

	public void setAlunoAula(List<AlunoAula> alunoAula) {
		this.alunoAula = alunoAula;
	}

	public Colaborador getColaborador() {
		return colaborador;
	}

	public void setColaborador(Colaborador colaborador) {
		this.colaborador = colaborador;
	}

}