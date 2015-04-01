package br.unicesumar.service;

import static br.unicesumar.datapage.DataPage.pageRequestForAsc;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.unicesumar.datapage.DataPage;
import br.unicesumar.entity.Bairro;
import br.unicesumar.entity.Cidade;
import br.unicesumar.repository.BairroRepository;

@Service
public class BairroService {
    
    @Autowired
    private BairroRepository bairroRepository;
    
    @Autowired
    private CidadeService cidadeService;
    
    public Bairro salvar(Bairro bairro) {
        return getBairroRepository().save(bairro);
    }
    
    public Bairro alterar(Bairro bairro) {
        return getBairroRepository().saveAndFlush(bairro);
    }
    
    public List<Bairro> listar() {
        return getBairroRepository().findAll();
    }

    public void apagar(Bairro bairro){
        getBairroRepository().delete(bairro);
    }
    
    public Bairro findById(Long id) {
        return getBairroRepository().findById(id);
    }

    public DataPage<Bairro> listar(Integer numeroPagina, String argumentoBusca) {
    	return new DataPage<>(getBairroRepository().findByNomeContainingIgnoreCase(argumentoBusca, pageRequestForAsc(numeroPagina, "nome")));
    }
    
    public List<Bairro> listarPorCidade(Long id) {
    	Cidade cidade = getCidadeService().findById(id);
    	if(null != cidade) {
    		return getBairroRepository().findAllByCidade(cidade);
    	}
    	return new ArrayList<>();
    }

    public Bairro buscarPorCep(String cep) {
		return getBairroRepository().buscarPorCep(cep);
	}

	/*
     * 
     GETTERS E SETTER
    */
    public BairroRepository getBairroRepository() {
        return this.bairroRepository;
    }
    private CidadeService getCidadeService() {
    	return this.cidadeService;
    }
}