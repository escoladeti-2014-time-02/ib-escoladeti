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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import br.unicesumar.datapage.DataPage;
import br.unicesumar.entity.Distrito;
import br.unicesumar.service.DistritoService;

@Controller
@RequestMapping("/rest/distrito")
public class DistritoResource implements CrudResource<Distrito> {

	@Autowired
	private DistritoService distritoService;

	@RequestMapping(method = POST)
	public @ResponseBody Distrito salvar(@RequestBody Distrito entidade) {
		return getService().salvar(entidade);
	}

	@RequestMapping(value = "/{id}", method = PUT)
	public @ResponseBody Distrito atualizar(@RequestBody Distrito entidade) {
		return getService().alterar(entidade);
	}

	@RequestMapping(value = "/{id}", method = DELETE)
	public @ResponseBody void apagar(@RequestBody Distrito entidade) {
		getService().apagar(entidade); 
	}
	
	@RequestMapping(value = "/pagina/{numeroPagina}", method = GET)
	public @ResponseBody DataPage<Distrito> listar(
			@PathVariable Integer numeroPagina,
			@RequestParam(value = "busca", required = false, defaultValue = "") String busca) {
		return getService().listar(numeroPagina, busca);
	}
	
	@RequestMapping(value = "/listarPorCidade/{id}")
	public @ResponseBody List<Distrito> listarPorCidade(@PathVariable Long id) {
		return getService().listarPorCidade(id);
	}

	@RequestMapping(method = GET)
	public @ResponseBody List<Distrito> listar() {
		return getService().listar();
	}

	@RequestMapping(value = "/{id}", method = GET)
	public @ResponseBody Distrito buscar(@PathVariable Long id) {
		return getService().buscarPorId(id);
	}

	/*
	 * GETTERS E SETTERS
	 */
	public DistritoService getService() {
		return distritoService;
	}
}