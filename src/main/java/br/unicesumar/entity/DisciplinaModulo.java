package br.unicesumar.entity;

import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;

/**
 * @author heidi
 * @author egardin
 */
@Entity
public class DisciplinaModulo extends EntidadeBase {
	private static final long serialVersionUID = 6556335788136446191L;
	
	@JoinColumn(name = "disciplina_id")
	@OneToOne(orphanRemoval = false)
	private Disciplina disciplina;

	private Double cargaHoraria;

	@JoinTable(name = "disciplinamodulo_colaborador")
	@ManyToMany(fetch = FetchType.EAGER)
	private Set<Colaborador> colaborador;

	@JsonIgnore
	@JoinColumn(name = "modulo_id")
	@ManyToOne
	private Modulo modulo;

	/*
	 * GETTERS e SETTERS
	 */
	public Disciplina getDisciplina() {
		return disciplina;
	}

	public void setDisciplina(Disciplina disciplina) { 
		this.disciplina = disciplina;
	}

	public Double getCargaHoraria() {
		return cargaHoraria;
	}

	public void setCargaHoraria(Double cargaHoraria) {
		this.cargaHoraria = cargaHoraria;
	}

	public Set<Colaborador> getColaboradores() {
		return colaborador;
	}

	public void setColaboradores(Set<Colaborador> colaboradores) {
		this.colaborador = colaboradores;
	}

	public Modulo getModulo() {
		return modulo;
	}

	public void setModulo(Modulo modulo) {
		this.modulo = modulo;
	}
}
