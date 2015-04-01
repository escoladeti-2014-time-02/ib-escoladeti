package br.unicesumar.entity;

import com.fasterxml.jackson.annotation.JsonValue;

public enum StatusProcessoSeletivo {
	
	PRE_SELECAO(1, "Pré seleção"), SELECAO(2, "Seleção"), AVALIACAO(3, "Avaliação");

	private Integer id;
	private String descricao;

	StatusProcessoSeletivo(Integer id, String descricao) {
		this.id = id;
		this.descricao = descricao;
	}

	@JsonValue
	public Integer getId() {
		return this.id;
	}

	@Override
	public String toString() {
		return String.format("%d - %s", id, descricao);
	}

	public static StatusProcessoSeletivo get(Integer etapa) {
		switch(etapa) {
			case 1:
				return PRE_SELECAO;
	
			case 2:
				return SELECAO;
	
			case 3:
				return AVALIACAO;

			default:
				return null;
		}
	}
}