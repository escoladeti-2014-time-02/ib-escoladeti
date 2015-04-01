package br.unicesumar.service;

import static br.unicesumar.datapage.DataPage.pageRequestForAsc;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import br.unicesumar.datapage.DataPage;
import br.unicesumar.entity.ItemDeAcessoUsuario;
import br.unicesumar.repository.ItemDeAcessoUsuarioRepository;


@Service
public class ItemDeAcessoUsuarioService {
	
	@Autowired
    private ItemDeAcessoUsuarioRepository itemDeAcessoUsuarioRepository;

    public ItemDeAcessoUsuario salvar(ItemDeAcessoUsuario itemDeAcessoUsuario) {
        return getItemDeAcessoUsuarioRepository().save(itemDeAcessoUsuario);
    }
    
    public ItemDeAcessoUsuario alterar(ItemDeAcessoUsuario itemDeAcessoUsuario) {
        return getItemDeAcessoUsuarioRepository().saveAndFlush(itemDeAcessoUsuario);
    }

    public DataPage<ItemDeAcessoUsuario> listar(Integer page) {
        return new DataPage<>(getItemDeAcessoUsuarioRepository().findAll(pageRequestForAsc(page, "nome")));
    }

    public void apagar(ItemDeAcessoUsuario itemDeAcessoUsuario) {
        getItemDeAcessoUsuarioRepository().delete(itemDeAcessoUsuario);
    }

    public ItemDeAcessoUsuario findById(Long id) {
    	return getItemDeAcessoUsuarioRepository().findById(id);
    }

    public List<ItemDeAcessoUsuario> listar() {
    	return getItemDeAcessoUsuarioRepository().findAll(new Sort(new Sort.Order(Sort.Direction.ASC, "nome")));
    }

    /*
     * 
     	GETTERS E SETTERS
     */    
    public ItemDeAcessoUsuarioRepository getItemDeAcessoUsuarioRepository() {
        return this.itemDeAcessoUsuarioRepository;
    }
}
