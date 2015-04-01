package br.unicesumar.entity;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.OneToMany;

@Entity
public class Calendario extends EntidadeBase{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = -4744636093572529982L;
	
	@OneToMany(cascade = CascadeType.ALL)
	private List<Aula> aulas;
	

	public List<Aula> getAulas() {
		return aulas;
	}

	public void setAulas(List<Aula> aulas) {
		this.aulas = aulas;
	}

}
