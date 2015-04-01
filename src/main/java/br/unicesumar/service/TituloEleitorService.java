package br.unicesumar.service;

import static br.unicesumar.datapage.DataPage.pageRequestForAsc;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.unicesumar.datapage.DataPage;
import br.unicesumar.entity.TituloEleitor;
import br.unicesumar.repository.TituloEleitorRepository;


@Service
public class TituloEleitorService {
	@Autowired
	private TituloEleitorRepository tituloEleitorRepository;
	
	public TituloEleitor salvar(TituloEleitor tituloEleitor){
		return getTituloEleitorRepository().save(tituloEleitor);
	}
	
	public TituloEleitor alterar(TituloEleitor tituloEleitor){
		return getTituloEleitorRepository().saveAndFlush(tituloEleitor);
	}
	
	public DataPage<TituloEleitor> listar(Integer page){
		return new DataPage<>(getTituloEleitorRepository().findAll(
				pageRequestForAsc(page, "nome")));
	}
	
	public void apagar(TituloEleitor tituloEleitor){
		getTituloEleitorRepository().delete(tituloEleitor);
	}
	
	public TituloEleitor findById(Long id){
		return getTituloEleitorRepository().findById(id);
	}
	
	

	public List<TituloEleitor> listar(){
		return getTituloEleitorRepository().findAll();
		
	}


	
	
	/*
	 * GETTERS E SETTERS
	 */

	public TituloEleitorRepository getTituloEleitorRepository() {
		return tituloEleitorRepository;
	}


}
