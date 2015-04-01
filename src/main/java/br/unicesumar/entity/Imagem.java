package br.unicesumar.entity;

import javax.persistence.Basic;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Transient;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Imagem extends EntidadeBase {
	/**
	 * 
	 */
	private static final long serialVersionUID = 8446140711182552921L;

	@Transient
	private String base64;

	@JsonIgnore
	@Basic(fetch = FetchType.LAZY)
	private byte[] data;

	public String getBase64() {
		if(base64 == null) {
			this.base64 = new String(data);
		}
		return base64;
	}

	public void setBase64(String base64) {
		this.base64 = base64;
		setData(base64.getBytes());
	}
	
	public void setData(byte[] data) {
		this.data = data;
	}

	public byte[] getData() {
		return this.data;
	}
}
