package br.unicesumar.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.unicesumar.entity.Bairro;
import br.unicesumar.entity.Endereco;
import br.unicesumar.entity.GeoLocalizacao;
import br.unicesumar.entity.Logradouro;
import br.unicesumar.entity.TipoEndereco;
import br.unicesumar.repository.EnderecoRepository;
import br.unicesumar.repository.GeoLocalizacaoRepository;

/**
 *
 * @author Matcher
 */
@Service
public class EnderecoService {

	@Autowired
	private EnderecoRepository enderecoRepository;

	@Autowired
	private LogradouroService logradouroService;

	@Autowired
	private BairroService bairroService;
	
	public Endereco salvar(Endereco endereco) {
		return getEnderecoRepository().save(endereco);
	}

	public List<Endereco> listar() {
		return getEnderecoRepository().findAll();
	}

	public String apagar(Endereco endereco) {
		getEnderecoRepository().delete(endereco);
		return "OK";
	}

	public Endereco findById(Long id) {
		return getEnderecoRepository().findById(id);
	}

	public Endereco alterar(Endereco endereco) {
		return getEnderecoRepository().saveAndFlush(endereco);
	}

	public Endereco buscarPorCep(String cep) {
		Logradouro logradouro = getLogradouroService().buscarPorCep(cep);
		if(logradouro == null) {
			logradouro = new Logradouro();
		}
		Bairro bairro = getBairroService().buscarPorCep(cep);
		if(bairro == null) {
			bairro = new Bairro();
		}

		Endereco endereco = new Endereco();
		endereco.setBairro(bairro);
		endereco.setLogradouro(logradouro);
		endereco.setTipoEndereco(TipoEndereco.Principal); // Alterar para dinâmico futuramente
		return endereco;
	}
	
	public List<GeoLocalizacao> listarGeoLocalizacoes() {
    	return getGeoLocalizacaoRepository().findAll();
    }
	/*
	 * GETTERS E SETTERS
	 */
	public EnderecoRepository getEnderecoRepository() {
		return this.enderecoRepository;
	}

	public LogradouroService getLogradouroService() {
		return logradouroService;
	}

	public BairroService getBairroService() {
		return bairroService;
	}
    
	public GeoLocalizacaoRepository getGeoLocalizacaoRepository() {
        return this.getGeoLocalizacaoRepository();
    }
	
}