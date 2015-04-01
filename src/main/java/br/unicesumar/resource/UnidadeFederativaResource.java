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
import br.unicesumar.entity.UnidadeFederativa;
import br.unicesumar.exception.CrudResourceException;
import br.unicesumar.service.UnidadeFederativaService;

@Controller
@RequestMapping(value = "/rest/uf")
public class UnidadeFederativaResource implements
		CrudResource<UnidadeFederativa> {

	@Autowired
	private UnidadeFederativaService service;

	@RequestMapping(method = POST)
	public @ResponseBody UnidadeFederativa salvar(
			@RequestBody UnidadeFederativa entidade) {
		return getUnidadeFederativaService().salvar(entidade);
	}

	@RequestMapping(value = "/{id}", method = PUT)
	public @ResponseBody UnidadeFederativa atualizar(
			@RequestBody UnidadeFederativa entidade) {
		return getUnidadeFederativaService().alterar(entidade);
	}

	@RequestMapping(value = "/{id}", method = DELETE)
	public @ResponseBody void apagar(@RequestBody UnidadeFederativa entidade) {
		getUnidadeFederativaService().apagar(entidade);
	}

	@RequestMapping(method = GET)
	public @ResponseBody List<UnidadeFederativa> listar() {
		return getUnidadeFederativaService().listar();
	}

	@RequestMapping(value = "/pagina/{numeroPagina}", method = GET)
	public @ResponseBody DataPage<UnidadeFederativa> listar(
			@PathVariable Integer numeroPagina,
			@RequestParam(value = "busca", required = false, defaultValue = "") String busca) {
		return getUnidadeFederativaService().listar(numeroPagina, busca);
	}

	@RequestMapping(value = "/listarPorPais/{idPais}", method = GET)
	public @ResponseBody List<UnidadeFederativa> listarPorIdPais(
			@PathVariable Long idPais) throws CrudResourceException {
		return getUnidadeFederativaService().listarPorIdPais(idPais);
	}

	@RequestMapping(value = "/{id}", method = GET)
	public @ResponseBody UnidadeFederativa buscar(@PathVariable Long id) {
		return getUnidadeFederativaService().findById(id);
	}

	public UnidadeFederativaService getUnidadeFederativaService() {
		return this.service;
	}
}