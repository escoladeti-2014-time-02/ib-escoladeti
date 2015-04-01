package br.unicesumar.entity;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Inheritance(strategy = InheritanceType.JOINED)
public class Empresa extends PessoaJuridica {
	/**
	 * 
	 */
	private static final long serialVersionUID = 4764734573483706720L;
	
	@JsonIgnore
	@OneToMany(mappedBy = "empresa")
	private List<Filial> filiais;

	public List<Filial> getFiliais() {
		return filiais;
	}

	public void setFiliais(List<Filial> filiais) {
		this.filiais = filiais;
	}
}