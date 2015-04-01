package br.unicesumar.service;

/**
*
* @author Matcher
*/
import static br.unicesumar.datapage.DataPage.pageRequestForAsc;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.unicesumar.datapage.DataPage;
import br.unicesumar.entity.Filial;
import br.unicesumar.exception.CrudResourceException;
import br.unicesumar.repository.FilialRepository;
@Service
public class FilialService extends CrudServiceTemplate<Filial>{

	
    @Autowired
    private FilialRepository filialRepository;

	public DataPage<Filial> listarPaginado(Integer numeroPagina, String argumentoBusca) throws CrudResourceException {
		return new DataPage<Filial>(getRepo().findByNomeContainingIgnoreCase(argumentoBusca, pageRequestForAsc(numeroPagina, "nome")));
	}

	/*
	 * GETTERS E SETTERS 
	 */
	@Override
	public FilialRepository getRepo() {
		return filialRepository;
	}
}
