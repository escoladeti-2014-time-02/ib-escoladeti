package br.unicesumar.service;

import static br.unicesumar.datapage.DataPage.pageRequestForAsc;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import br.unicesumar.datapage.DataPage;
import br.unicesumar.entity.Rg;
import br.unicesumar.repository.RgRepository;


public class RgService {
	
	@Autowired
	private RgRepository rgRepository;
	
	public Rg salvar(Rg rg){
		return getRgRepository().save(rg);
	}
	
	public Rg alterar(Rg rg){
		return getRgRepository().saveAndFlush(rg);
	}
	
	public DataPage<Rg> listar(Integer page){
		return new DataPage<>(getRgRepository().findAll(
				pageRequestForAsc(page, "nome")));
	}

	
		public void apagar(Rg rg){
		getRgRepository().delete(rg);
	}
	
	public Rg findById(Long id){
		return getRgRepository().findById(id);
	}
	

	public List<Rg> listar(){
		return getRgRepository().findAll();
		
	}
	
	//GET
	
	public RgRepository getRgRepository(){
		return rgRepository;
	}
	
	
	


}
