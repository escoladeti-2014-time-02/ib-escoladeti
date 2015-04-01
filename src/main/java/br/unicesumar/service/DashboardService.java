package br.unicesumar.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DashboardService {

	@Autowired
	private CandidatoService candidatoService;

	@Autowired
	private ProcessoSeletivoService processoSeletivoService;

	public Long getQuantidadeProcessosAberto() {
		return 0L;
	}
}