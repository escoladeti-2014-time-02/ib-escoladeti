package br.unicesumar.entity;

import com.fasterxml.jackson.annotation.JsonValue;


public enum TipoNivelDeAcesso {
	LISTAR("Listar"), ADICIONAR("Adicionar"), EDITAR("Editar"), EXCLUIR("Excluir");
	
	private String name;
	
	private TipoNivelDeAcesso(final String name){
		this.name = name;
	}
	
	@JsonValue
	public String getName(){
		return name;
	}
}	
