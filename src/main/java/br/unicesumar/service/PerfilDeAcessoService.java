package br.unicesumar.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import br.unicesumar.datapage.DataPage;
import br.unicesumar.entity.PerfilDeAcesso;
import br.unicesumar.repository.PerfilDeAcessoRepository;

/**
 *
 * @author Matcher
 */

@Service
public class PerfilDeAcessoService {
 
    
    @Autowired
    private PerfilDeAcessoRepository perfilDeAcessoRepository;
    
    public PerfilDeAcesso salvar(PerfilDeAcesso perfilDeAcesso){
        return getPerfilDeAcessoRepository().save(perfilDeAcesso);
    }
    
    public PerfilDeAcesso alterar(PerfilDeAcesso perfilDeAcesso){
        return getPerfilDeAcessoRepository().saveAndFlush(perfilDeAcesso);
    }
    
    public List<PerfilDeAcesso> listar(){
        return getPerfilDeAcessoRepository().findAll(new Sort(new Sort.Order(Sort.Direction.ASC, "nome")));
    }

    public void apagar(PerfilDeAcesso perfilDeAcesso){
        getPerfilDeAcessoRepository().delete(perfilDeAcesso);
    }
    
    public PerfilDeAcesso findById(Long id){
        return getPerfilDeAcessoRepository().findById(id);
    }
    
    public DataPage<PerfilDeAcesso> listar(Integer numeroPagina){
        return new DataPage<>(getPerfilDeAcessoRepository().findAll(DataPage.pageRequestForAsc(numeroPagina, "nome")));        
    }
    
    public PerfilDeAcessoRepository getPerfilDeAcessoRepository() {
            return this.perfilDeAcessoRepository;
    }
    
    
    
}
