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

import br.unicesumar.datapage.DataPage;
import br.unicesumar.entity.PessoaJuridica;
import br.unicesumar.service.PessoaJuridicaService;

@Controller
@RequestMapping("/rest/pessoajuridica")
public class PessoaJuridicaResource implements CrudResource<PessoaJuridica> {
	
	@Autowired
	private PessoaJuridicaService service;
	
	@RequestMapping(method = POST)
	public @ResponseBody PessoaJuridica salvar(@RequestBody PessoaJuridica entidade){
		return getService().salvar(entidade);
	}
	
	@RequestMapping(value = "/{id}", method = PUT)
	public @ResponseBody PessoaJuridica atualizar(@RequestBody PessoaJuridica pessoaJuridica){
		return getService().alterar(pessoaJuridica);
	}
	
	@RequestMapping(value = "/pagina/{numeroPagina}", method = GET)
	public @ResponseBody DataPage<PessoaJuridica> listar(@PathVariable Integer numeroPagina){
		return getService().listar(numeroPagina);
	}
	
	@RequestMapping(method = GET)
	public @ResponseBody List<PessoaJuridica> listar(){
		return getService().listar();
	}
	
	@RequestMapping(value = "/{id}", method = GET)
	public @ResponseBody PessoaJuridica buscar(@PathVariable Long id){
		return getService().findById(id);
	}
	
	@RequestMapping(value = "/{id}", method = DELETE)
	public @ResponseBody void apagar(@RequestBody PessoaJuridica pessoaJuridica){
		getService().apagar(pessoaJuridica);
	}

	/*
	 * GETTERS E SETTERS
	 */
	public PessoaJuridicaService getService(){
		return this.service;
	}
}