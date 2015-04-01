package br.unicesumar.resource;

import java.io.IOException;
import java.sql.SQLException;

import javax.servlet.http.HttpServletResponse;
import javax.sql.DataSource;

import net.sf.jasperreports.engine.JRException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import br.unicesumar.datapage.DataPage;
import br.unicesumar.entity.Disciplina;
import br.unicesumar.exception.CrudResourceException;
import br.unicesumar.service.DisciplinaService;

/**
 * @author Melina
 */
 

@Controller
@RequestMapping("/rest/disciplina")
public class DisciplinaResource extends CrudResourceTemplate<Disciplina> {

	@Autowired
	private DisciplinaService service;
	
	@Autowired
	private DataSource dataSource;

	@RequestMapping(value = "/pagina/{numeroPagina}", method = RequestMethod.GET)
	public @ResponseBody DataPage<Disciplina> listarPaginado(
			@PathVariable Integer numeroPagina,
			@RequestParam(value = "busca", required = false, defaultValue = "") String busca)
			throws CrudResourceException {
		return getService().listarPaginado(numeroPagina, busca);
	}
	
	 @RequestMapping(value = "imprimirRelatorio", method = RequestMethod.GET)
		public void imprimirRelatorio(HttpServletResponse response) throws IOException, JRException, SQLException {
			service.imprimirRelatorio(response, dataSource.getConnection());
		}
	 
	 @RequestMapping(value = "imprimirRelatorioFaltasDisciplina/{disciplinaid}", method = RequestMethod.GET)
		public void imprimirRelatorioFaltasDisciplina(
				@PathVariable Integer disciplinaid, HttpServletResponse response) throws IOException, JRException, SQLException {
			service.imprimirRelatorioFaltasDisciplina(disciplinaid, response, dataSource.getConnection());
		}

	/*
	 * GETTES E SETTERS
	 */
	public DisciplinaService getService() {
		return this.service;
	}
}
