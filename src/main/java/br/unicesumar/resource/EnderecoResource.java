/*
  * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package br.unicesumar.resource;

import static org.springframework.web.bind.annotation.RequestMethod.DELETE;
import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;
import static org.springframework.web.bind.annotation.RequestMethod.PUT;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import br.unicesumar.entity.Bairro;
import br.unicesumar.entity.Cidade;
import br.unicesumar.entity.Endereco;
import br.unicesumar.entity.FaixaDeCep;
import br.unicesumar.entity.GeoLocalizacao;
import br.unicesumar.entity.Logradouro;
import br.unicesumar.entity.Pais;
import br.unicesumar.entity.TipoEndereco;
import br.unicesumar.entity.TipoLogradouro;
import br.unicesumar.entity.UnidadeFederativa;
import br.unicesumar.service.EnderecoService;

/**
 *
 * @author Matcher
 */

@Controller
@RequestMapping(value = "/rest/endereco")
public class EnderecoResource {
    @Autowired
    private EnderecoService service;
   
    @RequestMapping(method = POST)
    public @ResponseBody Endereco salvar(@RequestBody Endereco entidade) {
        return getEnderecoService().salvar(entidade);
    }
    
    @RequestMapping(method = PUT)
    public @ResponseBody Endereco atualizar(@RequestBody Endereco entidade) {
        return getEnderecoService().alterar(entidade);
    }
    
    @RequestMapping(method = DELETE)
    public @ResponseBody String apagar(@RequestBody Endereco entidade) {
        return getEnderecoService().apagar(entidade);
    }
    
    @RequestMapping(method = GET)
    public @ResponseBody List<Endereco> listar() {
        return getEnderecoService().listar();
    }
    
    @RequestMapping(value = "/{id}",method = GET)
    public @ResponseBody Endereco buscar(@PathVariable Long id) {
        return getEnderecoService().findById(id);
    }
    
    @RequestMapping(value = "/listarGeoLocalizacoes", method = GET)
    public @ResponseBody List<GeoLocalizacao> listarGeoLocalizacoes() {
    	return getEnderecoService().listarGeoLocalizacoes();
    }

    @RequestMapping(value = "/teste", method = GET)
    public @ResponseBody Endereco teste() {
    	Pais p = new Pais();
    	UnidadeFederativa uf = new UnidadeFederativa();
    	uf.setPais(p);

    	Cidade cidade = new Cidade();
    	cidade.setUnidadeFederativa(uf);

    	FaixaDeCep f = new FaixaDeCep();

    	Bairro b = new Bairro();
    	b.setCidade(cidade);
    	b.getFaixasDeCep().add(f);

    	TipoLogradouro tl = new TipoLogradouro();
    	tl.setNome("Rua");

    	Logradouro l = new Logradouro();
    	l.setTipoLogradouro(tl);
    	l.getFaixasDeCep().add(f);

    	Endereco e = new Endereco();
    	e.setTipoEndereco(TipoEndereco.Principal);
    	e.setBairro(b);
    	e.setLogradouro(l);
    	e.setComplemento("Casa");
    	e.setNumero("123 - A");

    	return e;
    }

    @RequestMapping(value = "/buscarPorCep/{cep}", method = GET)
    public @ResponseBody Endereco buscarPor(@PathVariable String cep) {
    	return getEnderecoService().buscarPorCep(cep);
    }

    public EnderecoService getEnderecoService() {
        return this.service;
    }
}