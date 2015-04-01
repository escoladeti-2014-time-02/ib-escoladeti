package br.unicesumar.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.unicesumar.entity.Candidato;
import br.unicesumar.entity.PessoaFisica;
import br.unicesumar.repository.PessoaFisicaRepository;

@Service
public class PessoaFisicaService {
	
	@Autowired
	private PessoaFisicaRepository repo;

	@Transactional
	public Candidato findByCpf(String cpf) {
		return getRepo().findByCpf(cpf);
	}

	public PessoaFisica salvar(PessoaFisica pf) {
		return getRepo().save(pf);
	}

	public PessoaFisicaRepository getRepo() {
		return this.repo;
	}
}