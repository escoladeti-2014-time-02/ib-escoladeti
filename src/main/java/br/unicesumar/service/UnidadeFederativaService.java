package br.unicesumar.service;

import static br.unicesumar.datapage.DataPage.pageRequestForAsc;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import br.unicesumar.datapage.DataPage;
import br.unicesumar.entity.Pais;
import br.unicesumar.entity.UnidadeFederativa;
import br.unicesumar.exception.CrudResourceException;
import br.unicesumar.repository.UnidadeFederativaRepository;

@Service
public class UnidadeFederativaService {

    @Autowired
    private UnidadeFederativaRepository unidadeFederativaRepository;
    
    @Autowired
    private PaisService paisService;

    public UnidadeFederativa salvar(UnidadeFederativa unidadeFederativa) {
        return getUfRepo().save(unidadeFederativa);
    }

    public List<UnidadeFederativa> listar() {
        return getUfRepo().findAll(new Sort(new Sort.Order(Sort.Direction.ASC, "nome")));
    }

    public void apagar(UnidadeFederativa unidadeFederativa) {
        getUfRepo().delete(unidadeFederativa);
    }

    public UnidadeFederativa findById(Long id) {
        return getUfRepo().findById(id);
    }

    public UnidadeFederativa alterar(UnidadeFederativa unidadeFederativa){
        return getUfRepo().saveAndFlush(unidadeFederativa);
    }

    public List<UnidadeFederativa> listarPorIdPais(Long idPais) throws CrudResourceException {
    	Pais pais = getPaisService().buscar(idPais);

    	if(null != pais) {
    		return getUfRepo().findAllByPais(pais);
    	}
    	return new ArrayList<UnidadeFederativa>();
    }

    public DataPage<UnidadeFederativa> listar(Integer numeroPagina, String argumentoBusca) {
    	if(argumentoBusca == null || argumentoBusca.isEmpty()) {
    		return new DataPage<UnidadeFederativa>(getUfRepo().findAll(pageRequestForAsc(numeroPagina, "nome")));
    	}
    	return new DataPage<UnidadeFederativa>(getUfRepo().findByNomeContainingIgnoreCase(argumentoBusca, pageRequestForAsc(numeroPagina, "nome"))); 
    }

    /*
     * GETTERS E SETTERS 
     */
    public UnidadeFederativaRepository getUfRepo() {
        return this.unidadeFederativaRepository;
    }

	public PaisService getPaisService() {
		return paisService;
	}
}