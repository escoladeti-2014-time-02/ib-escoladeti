package br.unicesumar.service;

/**
 *
 * @author Matcher
 */
import static br.unicesumar.datapage.DataPage.pageRequestForAsc;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.unicesumar.datapage.DataPage;
import br.unicesumar.entity.Avaliacao;
import br.unicesumar.exception.CrudResourceException;
import br.unicesumar.repository.AvaliacaoRepository;

@Service
public class AvaliacaoService extends CrudServiceTemplate<Avaliacao> {

	@Autowired
	private AvaliacaoRepository avaliacaoRepository;

	public DataPage<Avaliacao> listarPaginado(Integer numeroPagina,
			String argumentoBusca) throws CrudResourceException {
		return new DataPage<Avaliacao>(getRepo()
				.findByLocalContainingIgnoreCase(argumentoBusca,
						pageRequestForAsc(numeroPagina, "local")));
	}

	/*
	 * GETTERS E SETTERS
	 */
	@Override
	public AvaliacaoRepository getRepo() {
		return avaliacaoRepository;
	}
}
