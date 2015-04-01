package br.unicesumar.resource;
/**
*
* @author Matcher
*/
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import br.unicesumar.datapage.DataPage;
import br.unicesumar.entity.Avaliacao;
import br.unicesumar.exception.CrudResourceException;
import br.unicesumar.service.AvaliacaoService;

@Controller
@RequestMapping("/rest/avaliacao")
public class AvaliacaoResource extends CrudResourceTemplate<Avaliacao>{

	
	@Autowired
	private AvaliacaoService avaliacaoService;

	@RequestMapping(value = "/pagina/{numeroPagina}", method = RequestMethod.GET)
	public @ResponseBody DataPage<Avaliacao> listarPaginado(
			@PathVariable Integer numeroPagina,
			@RequestParam(value = "busca", required = false, defaultValue = "") String busca)
			throws CrudResourceException {
		return getService().listarPaginado(numeroPagina, busca);
	}

	/*
	 * GETTES E SETTERS
	 */
	public AvaliacaoService getService() {
		return this.avaliacaoService;
	}
}
