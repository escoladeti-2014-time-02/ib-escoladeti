package br.unicesumar.service;

import static br.unicesumar.datapage.DataPage.pageRequestForAsc;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import br.unicesumar.datapage.DataPage;
import br.unicesumar.entity.PessoaJuridica;
import br.unicesumar.repository.PessoaJuridicaRepository;


@Service
public class PessoaJuridicaService {
	
	@Autowired
	private PessoaJuridicaRepository pessoaJuridicaRepository;
	
	public PessoaJuridica salvar(PessoaJuridica pessoaJuridica){
		return getPessoaJuridicaRepository().save(pessoaJuridica);
	}
	
	public PessoaJuridica alterar(PessoaJuridica pessoaJuridica){
		return getPessoaJuridicaRepository().saveAndFlush(pessoaJuridica);
	}
	
	public DataPage<PessoaJuridica> listar(Integer page){
		return new DataPage<>(getPessoaJuridicaRepository().findAll(pageRequestForAsc(page, "nome")));
	}
	
	public void apagar(PessoaJuridica pessoaJuridica){
		getPessoaJuridicaRepository().delete(pessoaJuridica);
	}
	
	public PessoaJuridica findById(Long id){
		return getPessoaJuridicaRepository().findById(id);
	}
	
	public List<PessoaJuridica> listar(){
		return getPessoaJuridicaRepository().findAll(new Sort(new Sort.Order(Sort.Direction.ASC, "nome")));
	}

   
   

    /*
     * 
     	GETTERS E SETTERS
     */    
    public PessoaJuridicaRepository getPessoaJuridicaRepository() {
        return this.pessoaJuridicaRepository;
    }

}
