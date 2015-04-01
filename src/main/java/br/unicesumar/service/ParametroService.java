package br.unicesumar.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.unicesumar.datapage.DataPage;
import br.unicesumar.entity.Parametro;
import br.unicesumar.repository.ParametroRepository;

/**
 * 
 * @author heidi
 *
 */

@Service
public class ParametroService {
	
	@Autowired
    private ParametroRepository parametroRepository;
    
    public Parametro salvar(Parametro parametro) {
        return getParametroRepo().save(parametro);
    }

    public Parametro findParametro() {
        return getParametroRepo().findFirstParametro();
    }
    
    public void deleteAll() {
    	getParametroRepo().deleteAll();
    }

    public Parametro alterar(Parametro parametro){
        return getParametroRepo().saveAndFlush(parametro);
    }
    
    public List<Parametro> listar() {
    	System.out.println("Método não suportado!");
    	return null;
    }
    
    public DataPage<Parametro> listar(Integer numeroPagina, String argumentoBusca) {
    	System.out.println("Método não suportado!");
    	return null;
    }
    
    public void apagar(Parametro parametro) {
    	System.out.println("Método não suportado!");
    }

    /*
     * GETTERS E SETTERS 
     */
    public ParametroRepository getParametroRepo() {
        return this.parametroRepository;
    }
}