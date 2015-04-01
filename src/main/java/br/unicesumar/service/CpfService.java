package br.unicesumar.service;

import static br.unicesumar.datapage.DataPage.pageRequestForAsc;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.unicesumar.datapage.DataPage;
import br.unicesumar.entity.Cpf;
import br.unicesumar.repository.CpfRepository;

@Service
public class CpfService {
	
	@Autowired
	private CpfRepository cpfRepository;
	
	public Cpf salvar(Cpf cpf){
		return getCpfRepository().save(cpf);
	}
	
	public Cpf alterar(Cpf cpf){
		return getCpfRepository().saveAndFlush(cpf);
	}
	
	public DataPage<Cpf> listar(Integer page){
		return new DataPage<>(getCpfRepository().findAll(
				pageRequestForAsc(page, "nome")));
				
	}
	
	public void apagar(Cpf cpf){
		getCpfRepository().delete(cpf);
	}
	
	public Cpf findById(Long id){
		return getCpfRepository().findById(id);
	}
	
	

	public List<Cpf> listar(){
		return getCpfRepository().findAll();
		
	}



	public CpfRepository getCpfRepository() {
		return cpfRepository;

	}
}
