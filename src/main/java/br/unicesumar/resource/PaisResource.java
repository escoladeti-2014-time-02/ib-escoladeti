package br.unicesumar.resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import br.unicesumar.datapage.DataPage;
import br.unicesumar.entity.Pais;
import br.unicesumar.exception.CrudResourceException;
import br.unicesumar.service.PaisService;

/**
 * @author Eduardo Gardin
 */
@Controller
@RequestMapping("/rest/pais")
public class PaisResource extends CrudResourceTemplate<Pais> {

	@Autowired
	private PaisService service;

	@RequestMapping(value = "/pagina/{numeroPagina}", method = RequestMethod.GET)
	public @ResponseBody DataPage<Pais> listarPaginado(
			@PathVariable Integer numeroPagina,
			@RequestParam(value = "busca", required = false, defaultValue = "") String busca)
			throws CrudResourceException {
		return getService().listarPaginado(numeroPagina, busca);
	}

	/*
	 * GETTES E SETTERS
	 */
	public PaisService getService() {
		return this.service;
	}
}