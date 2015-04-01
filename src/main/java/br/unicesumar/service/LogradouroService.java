/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package br.unicesumar.service;

import static br.unicesumar.datapage.DataPage.pageRequestForAsc;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.unicesumar.datapage.DataPage;
import br.unicesumar.entity.FaixaDeCep;
import br.unicesumar.entity.Logradouro;
import br.unicesumar.entity.TipoLogradouro;
import br.unicesumar.repository.LogradouroRepository;
import br.unicesumar.repository.TipoLogradouroRepository;

@Service
public class LogradouroService {
    
    @Autowired
    private LogradouroRepository logradouroRepository;
    
    @Autowired
    private TipoLogradouroRepository tipoLogradouroRepository;
    
    public Logradouro salvar(Logradouro logradouro) {
    	vincularLogradouroNaFaixaCep(logradouro);
        return getLogradouroRepository().save(logradouro);
    }

    @Transactional
    public List<Logradouro> listar() {
        return getLogradouroRepository().findAll(new Sort(new Sort.Order(Sort.Direction.ASC, "nome")));
    }
    
    @Transactional
    public void apagar(Logradouro logradouro) {
        getLogradouroRepository().delete(logradouro);
    }
    
    @Transactional
    public Logradouro findById(Long id) {
        return getLogradouroRepository().findById(id);
    }
    
    @Transactional
    public Logradouro alterar(Logradouro logradouro) {
    	vincularLogradouroNaFaixaCep(logradouro);
        return getLogradouroRepository().saveAndFlush(logradouro);
    }

    private void vincularLogradouroNaFaixaCep(Logradouro logradouro) {
		if(logradouro.getFaixasDeCep() != null && !logradouro.getFaixasDeCep().isEmpty()) {
    		for(FaixaDeCep faixaDeCep : logradouro.getFaixasDeCep()) {
    			faixaDeCep.setLogradouro(logradouro);
    		}
    	}
	}

    @Transactional(readOnly = true)
	public DataPage<Logradouro> listar(Integer numeroPagina, String argumentoBusca) {
    	DataPage<Logradouro> pagina = new DataPage<>(getLogradouroRepository().findByNomeContainingIgnoreCase(argumentoBusca, pageRequestForAsc(numeroPagina, "nome")));
    	List<Logradouro> logradouros = pagina.getList();

    	for(Logradouro l : logradouros) {
    		l.getFaixasDeCep();
    	}
		return pagina;
	}

    public List<TipoLogradouro> listarTiposLogradouro() {
    	return getTipoLogradouroRepository().findAll();
    }

    public List<Logradouro> listarPorBairro(Long idBairro) {
    	return getLogradouroRepository().listarPorBairro(idBairro);
    }

    public Logradouro buscarPorCep(String cep) {
		return getLogradouroRepository().buscarPorCep(cep);
	}

    /*
     * GETTERS E SETTERS
     */
    public LogradouroRepository getLogradouroRepository() {
        return this.logradouroRepository;
    }
    
    public TipoLogradouroRepository getTipoLogradouroRepository() {
        return this.tipoLogradouroRepository;
    }
}