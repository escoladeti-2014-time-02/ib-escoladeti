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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import br.unicesumar.datapage.DataPage;
import br.unicesumar.entity.Aluno;
import br.unicesumar.entity.EmpresaTurma;
import br.unicesumar.entity.Turma;
import br.unicesumar.exception.CrudResourceException;
import br.unicesumar.service.TurmaService;

@Controller
@RequestMapping("/rest/turma")
public class TurmaResource extends CrudResourceTemplate<Turma> {

	@Autowired
	private TurmaService service;
	
	@Autowired
	private DataSource dataSource;

	@RequestMapping(value = "/pagina/{numeroPagina}", method = RequestMethod.GET)
	public @ResponseBody DataPage<Turma> listarPaginado(
			@PathVariable Integer numeroPagina,
			@RequestParam(value = "busca", required = false, defaultValue = "") String busca)
			throws CrudResourceException {

		return getService().listarPaginado(numeroPagina, busca);
	}

	@RequestMapping(value = "/turmaempresa/{idTurma}", method = RequestMethod.GET)
	public @ResponseBody List<EmpresaTurma> getEmpresaTurma(
			@PathVariable Long idTurma) throws CrudResourceException {
		return getService().getEmpresasTurma(idTurma);
	}

	@RequestMapping(value = "/alunos/{idTurma}", method = RequestMethod.GET)
	public @ResponseBody List<Aluno> getAlunos(@PathVariable Long idTurma)
			throws CrudResourceException {
		return getService().getAlunos(idTurma);
	}

	@RequestMapping(value = "/filtrar/{numeroPagina}", method = RequestMethod.GET)
	public @ResponseBody DataPage<Turma> filtrar(
			@PathVariable Integer numeroPagina,
			@RequestParam(value = "nome", defaultValue = "", required = false) String descricao,
			@RequestParam(value = "orderBy", defaultValue = Turma.DATA_INICIO, required = false) String orderBy,
			@RequestParam(value = "turmaFechada", defaultValue = "false", required = false) Boolean turmaFechada,
			@RequestParam(value = "desc", defaultValue = "false", required = false) Boolean desc) {

		return getService().filtrar(descricao, orderBy, numeroPagina,
				turmaFechada, desc);
	}

	@RequestMapping(value = "/aluno/{idTurma}/{numeroPagina}", method = RequestMethod.GET)
	public @ResponseBody DataPage<Aluno> getAlunos(
			@PathVariable Integer numeroPagina, @PathVariable Long idTurma) {
		return getService().getAlunos(numeroPagina, idTurma);
	}

	@RequestMapping(value = "/aluno/filtrar/{idTurma}/{numeroPagina}", method = RequestMethod.GET)
	public @ResponseBody DataPage<Aluno> getAlunosByNome(
			@PathVariable Integer numeroPagina,
			@PathVariable Long idTurma,
			@RequestParam(value = "nome", required = false, defaultValue = "") String nome) {
		return getService().getAlunosByNome(idTurma, numeroPagina, nome);
	}
	

    @RequestMapping(value = "/filtrarPorAluno/{idAluno}", method = RequestMethod.GET)
	public @ResponseBody Turma getTurmaByAluno(@PathVariable Long idAluno) {
	    return getService().getTurmaByAluno(idAluno);
	}
    
	@RequestMapping(value = "/findTurmaByNome", method = GET)
	public @ResponseBody List<Turma> listarByName(
		@RequestParam(value = "nome", required = false, defaultValue = "") String nome) {
		return getService().findByNome(nome);
	}

	@RequestMapping(value = "imprimirRelatorio", method = RequestMethod.GET)
		public void imprimirRelatorioListagem(HttpServletResponse response) throws IOException, JRException, SQLException {
		 service.imprimirRelatorio(response, dataSource.getConnection());
	}
	
	@RequestMapping(value = "/relatorioTurma/{turmaId}", method = RequestMethod.GET)
	public void imprimirRelatorioTurma(
			@PathVariable Integer turmaId, HttpServletResponse response) throws IOException, JRException, SQLException {
	 service.imprimirRelatorioTurma(turmaId, response, dataSource.getConnection());
	}
	
	@RequestMapping(value = "/imprimirRelatorioFaltasTurma/{turmaId}", method = RequestMethod.GET)
	public void imprimirRelatorioFaltasTurma(
			@PathVariable Integer turmaId, HttpServletResponse response) throws IOException, JRException, SQLException {
	 service.imprimirRelatorioFaltasTurma(turmaId, response, dataSource.getConnection());
	}
	
	/**
	 * GETTERS E SETTERS
	 */
	public TurmaService getService() {
		return this.service;
	}
}