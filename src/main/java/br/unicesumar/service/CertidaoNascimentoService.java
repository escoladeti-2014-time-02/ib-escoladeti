package br.unicesumar.service;

import static br.unicesumar.datapage.DataPage.pageRequestForAsc;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.unicesumar.datapage.DataPage;
import br.unicesumar.entity.CertidaoNascimento;
import br.unicesumar.repository.CertidaoNascimentoRepository;


@Service
public class CertidaoNascimentoService {
	@Autowired
	private CertidaoNascimentoRepository certidaoNascimentoRepository;
	
	public CertidaoNascimento salvar(CertidaoNascimento certidaoNascimento){
		return getCertidaoNascimentoRepository().save(certidaoNascimento);
	}
	
	public CertidaoNascimento alterar(CertidaoNascimento certidaoNascimento){
		return getCertidaoNascimentoRepository().saveAndFlush(certidaoNascimento);
	}
	
	public DataPage<CertidaoNascimento> listar(Integer page){
		return new DataPage<>(getCertidaoNascimentoRepository().findAll(
				pageRequestForAsc(page, "nome")));
	}
	
	public void apagar(CertidaoNascimento certidaoNascimento){
		getCertidaoNascimentoRepository().delete(certidaoNascimento);
	}
	
	public CertidaoNascimento findById(Long id){
		return getCertidaoNascimentoRepository().findById(id);
	}
	
	

	public List<CertidaoNascimento> listar(){
		return getCertidaoNascimentoRepository().findAll();
		
	}


	
	
	/*
	 * GETTERS E SETTERS
	 */

	public CertidaoNascimentoRepository getCertidaoNascimentoRepository() {
		return certidaoNascimentoRepository;
	}


}
