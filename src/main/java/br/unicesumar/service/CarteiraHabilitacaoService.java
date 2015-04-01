package br.unicesumar.service;

import static br.unicesumar.datapage.DataPage.pageRequestForAsc;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.unicesumar.datapage.DataPage;
import br.unicesumar.entity.CarteiraHabilitacao;
import br.unicesumar.repository.CarteiraHabilitacaoRepository;


@Service
public class CarteiraHabilitacaoService {
	
	@Autowired
	private CarteiraHabilitacaoRepository carteiraHabilitacaoRepository;
	
	public CarteiraHabilitacao salvar(CarteiraHabilitacao cnh){
		return getCarteiraHabilitacaoRepository().save(cnh);
	}
	
	public CarteiraHabilitacao alterar(CarteiraHabilitacao cnh){
		return getCarteiraHabilitacaoRepository().saveAndFlush(cnh);
	}
	
	public DataPage<CarteiraHabilitacao> listar(Integer page){
		return new DataPage<>(getCarteiraHabilitacaoRepository().findAll(
				pageRequestForAsc(page, "nome")));
	}
	
	public void apagar(CarteiraHabilitacao cnh){
		getCarteiraHabilitacaoRepository().delete(cnh);
	}
	
	public CarteiraHabilitacao findById(Long id){
		return getCarteiraHabilitacaoRepository().findById(id);
	}
	
	

	public List<CarteiraHabilitacao> listar(){
		return getCarteiraHabilitacaoRepository().findAll();
		
	}


	
	
	/*
	 * GETTERS E SETTERS
	 */

	public CarteiraHabilitacaoRepository getCarteiraHabilitacaoRepository() {
		return carteiraHabilitacaoRepository;
	}


}
