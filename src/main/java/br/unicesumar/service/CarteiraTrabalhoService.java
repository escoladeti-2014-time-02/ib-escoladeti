package br.unicesumar.service;

import static br.unicesumar.datapage.DataPage.pageRequestForAsc;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.unicesumar.datapage.DataPage;
import br.unicesumar.entity.CarteiraTrabalho;
import br.unicesumar.repository.CarteiraTrabalhoRepository;



@Service
public class CarteiraTrabalhoService {
	
	@Autowired
	private CarteiraTrabalhoRepository carteiraTrabalhoRepository;
	
	public CarteiraTrabalho salvar(CarteiraTrabalho ctps){
		return getCarteiraTrabalhoRepository().save(ctps);
	}
	
	public CarteiraTrabalho alterar(CarteiraTrabalho ctps){
		return getCarteiraTrabalhoRepository().saveAndFlush(ctps);
	}
	
	public DataPage<CarteiraTrabalho> listar(Integer page){
		return new DataPage<>(getCarteiraTrabalhoRepository().findAll(
				pageRequestForAsc(page, "nome")));
	}
	
	public void apagar(CarteiraTrabalho ctps){
		getCarteiraTrabalhoRepository().delete(ctps);
	}
	
	public CarteiraTrabalho findById(Long id){
		return getCarteiraTrabalhoRepository().findById(id);
	}
	
	

	public List<CarteiraTrabalho> listar(){
		return getCarteiraTrabalhoRepository().findAll();
		
	}


	
	
	/*
	 * GETTERS E SETTERS
	 */

	public CarteiraTrabalhoRepository getCarteiraTrabalhoRepository() {
		return carteiraTrabalhoRepository;
	}


}
