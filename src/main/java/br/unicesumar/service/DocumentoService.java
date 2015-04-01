package br.unicesumar.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.unicesumar.entity.Documento;
import br.unicesumar.repository.DocumentoRepository;

@Service
public class DocumentoService extends CrudServiceTemplate<Documento> {
	
	@Autowired
	private DocumentoRepository documentoRepository;
	
	/*
	 * GETTERS E SETTERS
	 */
	public DocumentoRepository getRepo() {
		return documentoRepository;
	}
}