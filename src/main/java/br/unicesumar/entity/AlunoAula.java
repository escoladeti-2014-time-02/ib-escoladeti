package br.unicesumar.entity;

import javax.persistence.Entity;
import javax.persistence.OneToOne;

@Entity
public class AlunoAula extends EntidadeBase{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 2157234867168802103L;
	
	@OneToOne(orphanRemoval = false)
	private Aluno aluno;
	
	private Boolean presenca;

	public AlunoAula() {
		this.presenca = Boolean.TRUE;
	}
	public Boolean isPresenca() {
		return presenca;
	}	

	public void setPresenca(Boolean presenca) {
		this.presenca = presenca;
	}

	public Aluno getAluno() {
		return aluno;
	}

	public void setAluno(Aluno aluno) {
		this.aluno = aluno;
	}


}
