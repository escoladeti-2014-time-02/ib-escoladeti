package br.unicesumar.exception;

public class CrudResourceException extends Exception {
	/**
	 * 
	 */
	private static final long serialVersionUID = -3160655335078692369L;

	public CrudResourceException(String mensagem) {
		super(mensagem);
	}
}