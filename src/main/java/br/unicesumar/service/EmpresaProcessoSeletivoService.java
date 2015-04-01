package br.unicesumar.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.unicesumar.repository.EmpresaProcessoSeletivoRepository;

@Service
public class EmpresaProcessoSeletivoService {

	@Autowired
    private EmpresaProcessoSeletivoRepository repoEmpresaProcessoSeletivo;

	/*
	 * GETTERS E SETTERS
	 */
	public EmpresaProcessoSeletivoRepository getRepo() {
		return repoEmpresaProcessoSeletivo;
	}
}