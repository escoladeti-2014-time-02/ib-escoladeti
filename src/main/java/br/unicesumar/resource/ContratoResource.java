package br.unicesumar.resource;

import static org.springframework.web.bind.annotation.RequestMethod.GET;

import java.io.IOException;
import java.sql.SQLException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

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
import br.unicesumar.entity.Contrato;
import br.unicesumar.exception.CrudResourceException;
import br.unicesumar.service.ContratoService;

@Controller
@RequestMapping("/rest/contrato")
public class ContratoResource extends CrudResourceTemplate<Contrato> {

	@Autowired
	private ContratoService contratoService;
	
	@Autowired
	private DataSource dataSource;
		
	@RequestMapping(value = "/teste", method = GET)
	public @ResponseBody Contrato teste() {
		return new Contrato();
	}

	@RequestMapping(value = "/pagina/{numeroPagina}", method = RequestMethod.GET)
	public @ResponseBody DataPage<Contrato> listarPaginado(
			@PathVariable Integer numeroPagina,
			@RequestParam(value = "busca", required = false, defaultValue = "") String busca)
			throws CrudResourceException {

		return getService().listarPaginado(numeroPagina, busca);
	}
	
	@RequestMapping(value = "/filtrarPorData/pagina/{numeroPagina}", method = RequestMethod.GET)
	public @ResponseBody DataPage<Contrato> filtrarPorData(
			@PathVariable Integer numeroPagina,
			@RequestParam(value = "busca", required = false, defaultValue = "") String busca,
			@RequestParam(value = "dataInicio", required = false, defaultValue = "1990-01-01") String dataInicio,
			@RequestParam(value = "dataTermino", required = false, defaultValue = "2090-01-01") String dataTermino)
			throws CrudResourceException {
		
		Date dataIni = new Date();
		Date dataFim = new Date();
		SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
		try {
			 dataIni = formatter.parse(dataInicio);
			 dataFim = formatter.parse(dataTermino);
		} catch (ParseException e) {
			e.printStackTrace();
		}
	 
		return getService().filtrarPorData(numeroPagina, busca, dataIni, dataFim);
	}

	@RequestMapping(value = "/filtrarPorAluno/{idAluno}", method = RequestMethod.GET)
	public @ResponseBody Contrato filtrarPorAluno(@PathVariable("idAluno") Long idAluno) throws CrudResourceException {
		return getService().filtrarPorAluno(idAluno);
	}
	
	@RequestMapping(value = "/imprimirContrato/{idContrato}", method = RequestMethod.GET)
	public void imprimirContrato(
			@PathVariable Long idContrato, HttpServletResponse response) throws IOException, JRException, SQLException, CrudResourceException {
		getService().imprimirContrato(idContrato, response, dataSource.getConnection());
	}
	
	
	@RequestMapping(value = "/imprimirContratoPorDataDesligamento", method = RequestMethod.GET)
	public void imprimirContratoPorDataTermino(
			HttpServletResponse response) throws IOException, JRException, SQLException, CrudResourceException {
		getService().imprimirContratoPorDataTermino(response, dataSource.getConnection());
	}
	
	@Override
	public ContratoService getService() throws CrudResourceException {
		return contratoService;
	}
	
}