package br.unicesumar.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.unicesumar.entity.AlunoAula;
import br.unicesumar.repository.AlunoAulaRepository;


@Service
public class AlunoAulaService extends CrudServiceTemplate<AlunoAula>{
	
	@Autowired
	private AlunoAulaRepository alunoAulaRepository;
	
	@Override
	public AlunoAulaRepository getRepo() {
		return this.alunoAulaRepository;
	}

}
