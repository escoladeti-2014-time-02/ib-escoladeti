package br.unicesumar.entity;

import javax.persistence.Entity;

@Entity
public class Rg extends Documento {

	/**
	 * 
	 */
	private static final long serialVersionUID = 6196534880540972076L;
	
	private String orgaoExpedidor;

	public String getOrgaoExpedidor() {
		return orgaoExpedidor;
	}

	public void setOrgaoExpedidor(String orgaoExpedidor) {
		this.orgaoExpedidor = orgaoExpedidor;
	}
}