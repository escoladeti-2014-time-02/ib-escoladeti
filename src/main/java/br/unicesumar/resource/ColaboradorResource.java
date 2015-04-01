package br.unicesumar.resource;

import static org.springframework.web.bind.annotation.RequestMethod.GET;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;

import javax.servlet.http.HttpServletResponse;
import javax.sql.DataSource;

import net.sf.jasperreports.engine.JRException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import br.unicesumar.datapage.DataPage;
import br.unicesumar.entity.Colaborador;
import br.unicesumar.exception.CrudResourceException;
import br.unicesumar.service.ColaboradorService;

/**
 *
 * @author Matcher
 */

@Controller
@RequestMapping(value = "/rest/colaborador")
public class ColaboradorResource {
	
	@Autowired
	private ColaboradorService colaboradorService;
	
	@Autowired
	private DataSource dataSource;
	
	@RequestMapping(method = RequestMethod.POST)
	public @ResponseBody
	Colaborador salvar(@RequestBody Colaborador entidade) throws CrudResourceException {
		return getService().salvar(entidade);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.PUT)
	public @ResponseBody 
	Colaborador atualizar(@RequestBody Colaborador entidade) throws CrudResourceException {
		return getService().atualizar(entidade);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	public @ResponseBody
	void excluir(@RequestBody Colaborador entidade) throws CrudResourceException {
		getService().excluir(entidade);
	}

	@RequestMapping(method = RequestMethod.GET)
	public @ResponseBody
	List<Colaborador> listarTodas() throws CrudResourceException {
		return getService().listarTodas();
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public @ResponseBody
	Colaborador buscar(@PathVariable("id") Long id) throws CrudResourceException {
		return getService().buscar(id);
	}
    
	@RequestMapping(value = "/pagina/{numeroPagina}", method = GET)
	public @ResponseBody DataPage<Colaborador> listar(
			@PathVariable Integer numeroPagina,
			@RequestParam(value = "busca", required = false, defaultValue = "") String busca) {
		return getService().listar(numeroPagina, busca);
	}
	
    @RequestMapping(value = "imprimirRelatorio", method = RequestMethod.GET)
	public void imprimirRelatorio(HttpServletResponse response) throws IOException, JRException, SQLException {
    	colaboradorService.imprimirRelatorio(response, dataSource.getConnection());
	}
	
	public ColaboradorService getService() {
		return this.colaboradorService;
	}
}
