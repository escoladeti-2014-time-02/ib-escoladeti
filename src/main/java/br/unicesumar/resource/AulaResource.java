package br.unicesumar.resource;

import java.io.IOException;
import java.sql.SQLException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.servlet.http.HttpServletResponse;
import javax.sql.DataSource;

import net.sf.jasperreports.engine.JRException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import br.unicesumar.datapage.DataPage;
import br.unicesumar.entity.Aula;
import br.unicesumar.exception.CrudResourceException;
import br.unicesumar.service.AulaService;
import br.unicesumar.util.date.DateUtils;

@Controller
@RequestMapping("/rest/aula")
public class AulaResource extends CrudResourceTemplate<Aula> {

	@Autowired
	private AulaService aulaService;
	
	@Autowired
	private DataSource dataSource;

	@RequestMapping(value = "/{idTurma}/{idModulo}/{idDisciplina}/{idColaborador}", method = {
			RequestMethod.POST, RequestMethod.PUT })
	public @ResponseBody Aula salvar(@RequestBody Aula aula,
			@PathVariable Long idTurma, @PathVariable Long idModulo,
			@PathVariable Long idDisciplina, @PathVariable Long idColaborador)
			throws CrudResourceException {

		return getService().salvar(aula, idTurma, idModulo, idDisciplina,
				idColaborador);
	}

	@RequestMapping(value = "/turma/{idTurma}/modulo/{idModulo}/disciplina/{idDisciplina}/data/{data}/pagina/{numeroPagina}", method = RequestMethod.GET)
	public @ResponseBody ResponseEntity<DataPage<Aula>> filtrar(
			@PathVariable Long idTurma, @PathVariable Long idModulo,
			@PathVariable Long idDisciplina, @PathVariable String data,
			@PathVariable Integer numeroPagina) throws CrudResourceException {

		try {
			Date dataConvertida = new SimpleDateFormat(
					DateUtils.FORMATO_AMERICANO).parse(data);

			return new ResponseEntity<DataPage<Aula>>(getService().filtrar(
					idTurma, idModulo, idDisciplina, dataConvertida,
					numeroPagina), HttpStatus.OK);
		} catch (ParseException ex) {
			return new ResponseEntity<DataPage<Aula>>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/pagina/{numeroPagina}", method = RequestMethod.GET)
	public @ResponseBody DataPage<Aula> listarPaginadoSemBusca(
			@PathVariable Integer numeroPagina) throws CrudResourceException {
		return getService().listarPaginadoSemBusca(numeroPagina);
	}
	
	@RequestMapping(value = "imprimirRelatorioFaltasAula/{aulaid}", method = RequestMethod.GET)
	public void imprimirRelatorioFaltasAula(
			@PathVariable Integer aulaid, HttpServletResponse response) throws IOException, JRException, SQLException {
	 aulaService.imprimirRelatorioFaltasAula(aulaid, response, dataSource.getConnection());
	}

	@RequestMapping(value = "imprimirFrequenciaAlunos", method = RequestMethod.GET)
	public void imprimirFrequenciaAlunos(HttpServletResponse response) throws IOException, JRException, SQLException {
	 aulaService.imprimirFrequenciaAlunos(response, dataSource.getConnection());
	}	

	public AulaService getService() {
		return this.aulaService;
	}
}