package br.unicesumar.service;

import static br.unicesumar.datapage.DataPage.pageRequestForAsc;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.unicesumar.datapage.DataPage;
import br.unicesumar.entity.RegistroNacional;
import br.unicesumar.repository.RegistroNacionalRepository;


@Service
public class RegistroNacionalService {

	@Autowired
	private RegistroNacionalRepository registroNacionalRepository;
	
	public RegistroNacional salvar(RegistroNacional registroNacional){
		return getRegistroNacionalRepository().save(registroNacional);
	}
	
	public RegistroNacional alterar(RegistroNacional registroNacional){
		return getRegistroNacionalRepository().saveAndFlush(registroNacional);
	}
	
	public DataPage<RegistroNacional> listar(Integer page){
		return new DataPage<>(getRegistroNacionalRepository().findAll(
				pageRequestForAsc(page, "nome")));
	}
	
	public void apagar(RegistroNacional registroNacional){
		getRegistroNacionalRepository().delete(registroNacional);
	}
	
	public RegistroNacional findById(Long id){
		return getRegistroNacionalRepository().findById(id);
	}
	
	

	public List<RegistroNacional> listar(){
		return getRegistroNacionalRepository().findAll();
		
	}


	
	
	/*
	 * GETTERS E SETTERS
	 */

	public RegistroNacionalRepository getRegistroNacionalRepository() {
		return registroNacionalRepository;
	}

}
