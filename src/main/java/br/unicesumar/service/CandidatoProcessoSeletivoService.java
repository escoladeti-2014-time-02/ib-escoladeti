package br.unicesumar.service;

/**
 *
 * @author Matcher
 */
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.unicesumar.entity.CandidatoProcessoSeletivo;
import br.unicesumar.repository.CandidatoProcessoSeletivoRepository;

@Service
public class CandidatoProcessoSeletivoService extends
		CrudServiceTemplate<CandidatoProcessoSeletivo> {

	@Autowired
	private CandidatoProcessoSeletivoRepository candidatoProcessoSeletivoRepository;
	
	/*
	 * GETTERS E SETTERS
	 */
	@Override
	public CandidatoProcessoSeletivoRepository getRepo() {
		return candidatoProcessoSeletivoRepository;
	}
}
