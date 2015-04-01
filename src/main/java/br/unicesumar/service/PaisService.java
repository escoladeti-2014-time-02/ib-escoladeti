package br.unicesumar.service;

import static br.unicesumar.datapage.DataPage.pageRequestForAsc;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.unicesumar.datapage.DataPage;
import br.unicesumar.entity.Pais;
import br.unicesumar.exception.CrudResourceException;
import br.unicesumar.repository.PaisRepository;

/**
 * @author Eduardo Gardin
 */
@Service
public class PaisService extends CrudServiceTemplate<Pais> {

    @Autowired
    private PaisRepository paisRepository;

	public DataPage<Pais> listarPaginado(Integer numeroPagina, String argumentoBusca) throws CrudResourceException {
		return new DataPage<Pais>(getRepo().findByNomeContainingIgnoreCase(argumentoBusca, pageRequestForAsc(numeroPagina, "nome")));
	}

	/*
	 * GETTERS E SETTERS 
	 */
	@Override
	public PaisRepository getRepo() {
		return paisRepository;
	}
}