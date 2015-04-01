package br.unicesumar.resource;

/**
 *
 * @author Matcher
 */
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import br.unicesumar.entity.CandidatoProcessoSeletivo;
import br.unicesumar.service.CandidatoProcessoSeletivoService;

@Controller
@RequestMapping("/rest/candidatoProcessoSeletivo")
public class CandidatoProcessoSeletivoResource extends
		CrudResourceTemplate<CandidatoProcessoSeletivo> {

	@Autowired
	private CandidatoProcessoSeletivoService candidatoProcessoSeletivoService;

	/*
	 * GETTES E SETTERS
	 */
	public CandidatoProcessoSeletivoService getService() {
		return this.candidatoProcessoSeletivoService;
	}
}