package br.unicesumar.entity;

public enum NivelCandidatoProcesso {
	NAO_SELECIONADO(1, "Não selecionado"), PRE_SELECIONADO(2, "Pré-selecionado"),
	SELECIONADO_AVALIACAO(3, "Selecionado avaliação"), APROVADO(4, "Aprovado");

	private Integer nivel;

	private String descricao;

	private NivelCandidatoProcesso(Integer nivel, String descricao) {
		this.nivel = nivel;
		this.descricao = descricao;
	}

	public String toString() {
		return String.format("%d - %s", nivel, descricao);
	}
	
	public static NivelCandidatoProcesso get(Integer nivel) {
		switch(nivel) {
			case 1:
				return NivelCandidatoProcesso.NAO_SELECIONADO;
	
			case 2:
				return NivelCandidatoProcesso.PRE_SELECIONADO;
	
			case 3:
				return NivelCandidatoProcesso.SELECIONADO_AVALIACAO;
	
			case 4:
				return NivelCandidatoProcesso.APROVADO;

			default:
				return null;
		}
	}
}