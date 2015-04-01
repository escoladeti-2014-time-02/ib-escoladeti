package br.unicesumar.service;

import static br.unicesumar.datapage.DataPage.pageRequestForAsc;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import br.unicesumar.datapage.DataPage;
import br.unicesumar.entity.ItemDeAcesso;
import br.unicesumar.repository.ItemDeAcessoRepository;

@Service
public class ItemDeAcessoService {

	@Autowired
	private ItemDeAcessoRepository itemDeAcessoRepository;

	public ItemDeAcesso salvar(ItemDeAcesso itemDeAcesso) {
		return getItemDeAcessoRepository().save(itemDeAcesso);
	}
	    
	public ItemDeAcesso alterar(ItemDeAcesso itemDeAcesso) {
	    return getItemDeAcessoRepository().saveAndFlush(itemDeAcesso);
	}

	public DataPage<ItemDeAcesso> listar(Integer page) {
	    return new DataPage<>(getItemDeAcessoRepository().findAll(pageRequestForAsc(page, "nome")));
	}

	public void apagar(ItemDeAcesso itemDeAcesso) {
		getItemDeAcessoRepository().delete(itemDeAcesso);
	}

	public ItemDeAcesso findById(Long id) {
		return getItemDeAcessoRepository().findById(id);
	}

	public List<ItemDeAcesso> listar() {
	  	return getItemDeAcessoRepository().findAll(new Sort(new Sort.Order(Sort.Direction.ASC, "nome")));
	}

	/*
	 * 
		GETTERS E SETTERS
	*/    
	public ItemDeAcessoRepository getItemDeAcessoRepository() {
	    return this.itemDeAcessoRepository;
	}
}
