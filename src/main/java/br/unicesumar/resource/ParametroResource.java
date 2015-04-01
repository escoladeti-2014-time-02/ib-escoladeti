package br.unicesumar.resource;

import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;
import static org.springframework.web.bind.annotation.RequestMethod.PUT;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import br.unicesumar.entity.Parametro;
import br.unicesumar.exception.CrudResourceException;
import br.unicesumar.service.ParametroService;

/**
 * 
 * @author heidi
 *
 */

@Controller
@RequestMapping("/rest/parametro")
public class ParametroResource implements CrudResource<Parametro> {

	@Autowired
	private ParametroService service;

	@RequestMapping(method = POST)
	public @ResponseBody Parametro salvar(@RequestBody Parametro entidade) {
		return getParametroService().salvar(entidade);
	}

	@RequestMapping(value = "/{id}", method = PUT)
	public @ResponseBody Parametro atualizar(@RequestBody Parametro entidade) {
		return getParametroService().alterar(entidade);
	}

	@RequestMapping(value = "/buscarParametro", method = GET)
	public @ResponseBody Parametro buscar() {
		return getParametroService().findParametro();
	}
	
	@RequestMapping(method = RequestMethod.DELETE)
	public @ResponseBody void excluirTodos() throws CrudResourceException {
		getParametroService().deleteAll();
	}
	
	@RequestMapping(value = "/teste", method = GET)
	public @ResponseBody Parametro teste() {
		Parametro parametro = new Parametro();
		return parametro;
	}
	
	public ParametroService getParametroService() {
		return this.service;
	}

	@Override
	public void apagar(Parametro entidade) {
		System.out.println("Método não suportado!");
	}
	
	@Override
	public Parametro buscar(Long id) {
		System.out.println("Método não suportado!");
		return null;
	}
	
	@RequestMapping(method = GET)
	public @ResponseBody List<Parametro> listar() {
		System.out.println("Método não suportado!");
		return null;
	}
}