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
import br.unicesumar.entity.Filial;
import br.unicesumar.exception.CrudResourceException;
import br.unicesumar.service.FilialService;

@Controller
@RequestMapping("/rest/filial")
public class FilialResource extends CrudResourceTemplate<Filial> {

	
	@Autowired
	private FilialService filialService;

	@RequestMapping(value = "/pagina/{numeroPagina}", method = RequestMethod.GET)
	public @ResponseBody DataPage<Filial> listarPaginado(
			@PathVariable Integer numeroPagina,
			@RequestParam(value = "busca", required = false, defaultValue = "") String busca)
			throws CrudResourceException {
		return getService().listarPaginado(numeroPagina, busca);
	}

	/*
	 * GETTES E SETTERS
	 */
	public FilialService getService() {
		return this.filialService;
	}

}
