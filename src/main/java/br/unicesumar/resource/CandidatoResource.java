package br.unicesumar.resource;

import static org.springframework.web.bind.annotation.RequestMethod.DELETE;
import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;
import static org.springframework.web.bind.annotation.RequestMethod.PUT;

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
import br.unicesumar.entity.Candidato;
import br.unicesumar.exception.CandidatoException;
import br.unicesumar.exception.CrudResourceException;
import br.unicesumar.service.CandidatoService;

@Controller
@RequestMapping("/rest/candidato")
public class CandidatoResource implements CrudResource<Candidato> {

	@Autowired
	private CandidatoService service;
	
	@Autowired
	private DataSource dataSource;

	@RequestMapping(method = POST, consumes = javax.ws.rs.core.MediaType.APPLICATION_JSON, produces = javax.ws.rs.core.MediaType.APPLICATION_JSON)
	public @ResponseBody Candidato salvar(@RequestBody Candidato candidato) {
		Candidato retorno = null;
		try {
			retorno = getService().salvar(candidato);
		} catch (CandidatoException | CrudResourceException e) {
			e.printStackTrace();
		}
		return retorno;
	}

	@RequestMapping(value = "/{id}", method = PUT)
	public @ResponseBody Candidato atualizar(@RequestBody Candidato candidato) {
		return getService().alterar(candidato);
	}

	@RequestMapping(value = "/pagina/{numeroPagina}", method = GET)
	public @ResponseBody DataPage<Candidato> listar(
			@PathVariable Integer numeroPagina,
			@RequestParam(value = "busca", required = false, defaultValue = "") String busca) {
		return getService().listar(numeroPagina, busca);
	}

	@RequestMapping(method = GET)
	public @ResponseBody List<Candidato> listar() {
		return getService().listar();
	}
	
	@RequestMapping(value = "/findbynome", method = GET)
	public @ResponseBody List<Candidato> listarByName(
		@RequestParam(value = "nome", required = false, defaultValue = "") String nome) {
		return getService().findByNome(nome);
	}

	@RequestMapping(value = "/{id}", method = GET)
	public @ResponseBody Candidato buscar(@PathVariable Long id) {
		return getService().findById(id);
	}

	@RequestMapping(value = "/{id}", method = DELETE)
	public @ResponseBody void apagar(@RequestBody Candidato candidato) {
		getService().apagar(candidato);
	}
	
	@RequestMapping(value = "imprimirRelatorio", method = RequestMethod.GET)
	public void imprimirRelatorio(HttpServletResponse response) throws IOException, JRException, SQLException {
		service.imprimirRelatorio(response, dataSource.getConnection());
	}
	

	/*
	 * GETTERS E SETTERS
	 */
	public CandidatoService getService() {
		return this.service;
	}
}
