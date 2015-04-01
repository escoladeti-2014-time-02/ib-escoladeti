package br.unicesumar.entity;

import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.OneToMany;

/**
 * 
 * @author heidi
 *
 */

@Entity
public class Parametro extends EntidadeBase {
	/**
	 * 
	 */
	private static final long serialVersionUID = -3936877377648508376L;

	private String nomePresidente;
	
	private String nacionalidadePresidente;

	@Enumerated
	private EstadoCivil estadoCivilPresidente;
	
	private String profissaoPresidente;
	
	private String rgPresidente;
	
	private String orgaoExpedidorPresidente;
	
	private String cpfPresidente;
	
	@OneToMany(cascade = CascadeType.ALL, fetch =  FetchType.EAGER)
	private Set<Endereco> enderecos;

	public String getNomePresidente() {
		return nomePresidente;
	}

	public void setNomePresidente(String nomePresidente) {
		this.nomePresidente = nomePresidente;
	}

	public String getNacionalidadePresidente() {
		return nacionalidadePresidente;
	}

	public void setNacionalidadePresidente(String nacionalidadePresidente) {
		this.nacionalidadePresidente = nacionalidadePresidente;
	}

	public EstadoCivil getEstadoCivilPresidente() {
		return estadoCivilPresidente;
	}

	public void setEstadoCivilPresidente(EstadoCivil estadoCivilPresidente) {
		this.estadoCivilPresidente = estadoCivilPresidente;
	}

	public String getProfissaoPresidente() {
		return profissaoPresidente;
	}

	public void setProfissaoPresidente(String profissaoPresidente) {
		this.profissaoPresidente = profissaoPresidente;
	}

	public String getRgPresidente() {
		return rgPresidente;
	}

	public void setRgPresidente(String rgPresidente) {
		this.rgPresidente = rgPresidente;
	}

	public String getOrgaoExpedidorPresidente() {
		return orgaoExpedidorPresidente;
	}

	public void setOrgaoExpedidorPresidente(String orgaoExpedidorPresidente) {
		this.orgaoExpedidorPresidente = orgaoExpedidorPresidente;
	}

	public String getCpfPresidente() {
		return cpfPresidente;
	}

	public void setCpfPresidente(String cpfPresidente) {
		this.cpfPresidente = cpfPresidente;
	}

	public Set<Endereco> getEnderecos() {
		return enderecos;
	}

	public void setEnderecos(Set<Endereco> enderecos) {
		this.enderecos = enderecos;
	}
	
}
