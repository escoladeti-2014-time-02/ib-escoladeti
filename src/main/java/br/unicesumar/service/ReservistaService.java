package br.unicesumar.service;


import static br.unicesumar.datapage.DataPage.pageRequestForAsc;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.unicesumar.datapage.DataPage;
import br.unicesumar.entity.Reservista;
import br.unicesumar.repository.ReservistaRepository;


@Service
public class ReservistaService {
	
	@Autowired
	private ReservistaRepository reservistaRepository;
	
	public Reservista salvar(Reservista reservista){
		return getReservistaRepository().save(reservista);
	}
	
	public Reservista alterar(Reservista reservista){
		return getReservistaRepository().saveAndFlush(reservista);
	}
	
	public DataPage<Reservista> listar(Integer page){
		return new DataPage<>(getReservistaRepository().findAll(
				pageRequestForAsc(page, "nome")));
	}
	
	public void apagar(Reservista reservista){
		getReservistaRepository().delete(reservista);
	}
	
	public Reservista findById(Long id){
		return getReservistaRepository().findById(id);
	}
	
	

	public List<Reservista> listar(){
		return getReservistaRepository().findAll();
		
	}


	
	
	/*
	 * GETTERS E SETTERS
	 */

	public ReservistaRepository getReservistaRepository() {
		return reservistaRepository;
	}

}
