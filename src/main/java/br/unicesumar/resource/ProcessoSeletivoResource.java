package br.unicesumar.resource;

/**
 *
 * @author Matcher
 */
import java.io.IOException;
import java.sql.SQLException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import br.unicesumar.datapage.DataPage;
import br.unicesumar.entity.Avaliacao;
import br.unicesumar.entity.Candidato;
import br.unicesumar.entity.CandidatoProcessoSeletivo;
import br.unicesumar.entity.EmpresaProcessoSeletivo;
import br.unicesumar.entity.Entrevista;
import br.unicesumar.entity.ProcessoSeletivo;
import br.unicesumar.exception.CrudResourceException;
import br.unicesumar.exception.ProcessoSeletivoException;
import br.unicesumar.service.CandidatoProcessoSeletivoService;
import br.unicesumar.service.ProcessoSeletivoService;
import br.unicesumar.util.date.DateUtils;

@Controller
@RequestMapping("/rest/processoseletivo")
public class ProcessoSeletivoResource {

	@Autowired
	private ProcessoSeletivoService processoSeletivoService;

	@Autowired
	private CandidatoProcessoSeletivoService candidatoProcessoSeletivoService;
	
	@Autowired
	private DataSource dataSource;

	@RequestMapping(method = RequestMethod.POST)
	public @ResponseBody ProcessoSeletivo inserir(
			@RequestBody ProcessoSeletivo ps) throws CrudResourceException {
		return this.processoSeletivoService.salvar(ps);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.PUT)
	public @ResponseBody ProcessoSeletivo atualizar(
			@RequestBody ProcessoSeletivo ps) throws CrudResourceException {
		return this.processoSeletivoService.atualizar(ps);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	public @ResponseBody void excluir(@RequestBody ProcessoSeletivo ps)
			throws CrudResourceException {
		this.processoSeletivoService.excluir(ps);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public @ResponseBody ProcessoSeletivo buscar(@PathVariable Long id)
			throws CrudResourceException {
		return this.processoSeletivoService.buscar(id);
	}

	@RequestMapping(value = "/listarPorNivel/{idProcesso}/{numeroPagina}", method = RequestMethod.GET)
	public @ResponseBody DataPage<CandidatoProcessoSeletivo> listarPorNivel(
			@RequestParam(value = "niveis") Integer[] niveis,
			@PathVariable Long idProcesso, @PathVariable Integer numeroPagina) {

		return processoSeletivoService.listarPorNivel(idProcesso,
				Arrays.asList(niveis), numeroPagina);
	}
	
	@RequestMapping(value = "/alterarNivelCandidatos/{idProcesso}/{novoNivel}", method = RequestMethod.GET)
	public @ResponseBody DataPage<CandidatoProcessoSeletivo> mudarNivelCandidatos(
			@RequestParam(value = "niveisAtuais") Integer[] niveisAtuais,
			@PathVariable Long idProcesso, @PathVariable Integer novoNivel) {

		return processoSeletivoService.alterarNivelDeCandidatos(idProcesso, Arrays.asList(niveisAtuais), novoNivel);
	}

	@RequestMapping(value = "/adicionarEmpresa/{idProcesso}", method = RequestMethod.POST)
	public @ResponseBody EmpresaProcessoSeletivo adicionarEmpresaAoProcesso(
			@RequestBody EmpresaProcessoSeletivo empresaProcesso,
			@PathVariable Long idProcesso) throws ProcessoSeletivoException {
		return processoSeletivoService.adicionarEmpresaAoProcesso(
				empresaProcesso, idProcesso);
	}

	@RequestMapping(value = "/removerEmpresa/{idEmpresa}", method = RequestMethod.DELETE)
	public @ResponseBody void removerEmpresaDoProcesso(
			@PathVariable Long idEmpresa) {
		processoSeletivoService.removerEmpresaDoProcesso(idEmpresa);
	}

	@RequestMapping(value = "/listarEmpresasDisponiveis/{idProcesso}", method = RequestMethod.GET)
	public @ResponseBody List<EmpresaProcessoSeletivo> listarEmpresasDisponiveisProcesso(
			@PathVariable Long idProcesso) {
		return processoSeletivoService
				.listarEmpresasDisponiveisProcesso(idProcesso);
	}

	@RequestMapping(value = "/listarEmpresasProcesso/{idProcesso}", method = RequestMethod.GET)
	public @ResponseBody List<EmpresaProcessoSeletivo> listarEmpresasProcesso(
			@PathVariable Long idProcesso) {
		return processoSeletivoService.listarEmpresasDoProcesso(idProcesso);
	}

	@RequestMapping(value = "/pagina/{numeroPagina}", method = RequestMethod.GET)
	public @ResponseBody DataPage<ProcessoSeletivo> listarPaginado(
			@PathVariable Integer numeroPagina,
			@RequestParam(value = "busca", required = false, defaultValue = "") String busca) {
		return processoSeletivoService.listarPaginado(numeroPagina, busca);
	}

	@RequestMapping(value = "/atualizarEtapaProcesso/{idProcesso}/{etapa}", method = RequestMethod.POST)
	public @ResponseBody ProcessoSeletivo atualizarCandidato(
			@RequestBody(required = false) CandidatoProcessoSeletivo candidatoProcesso,
			@PathVariable Long idProcesso, @PathVariable Integer etapa)
			throws CrudResourceException {
		return processoSeletivoService
				.atualizarEtapaProcesso(idProcesso, etapa);
	}

	@RequestMapping(value = "/atualizarCandidatoProcesso/{idCandidatoProcesso}/{nivel}", method = RequestMethod.POST)
	public @ResponseBody void atualizarCandidatoProcesso(
			@PathVariable Long idCandidatoProcesso, @PathVariable Integer nivel) {
		processoSeletivoService.atualizarCandidatoProcesso(
				idCandidatoProcesso, nivel);
	}

	@RequestMapping(value = "/previsualizarPerfil", method = RequestMethod.GET)
	@ResponseBody
	List<Candidato> listarPorPerfil(
			@RequestParam(value = "idadeMinima", required = false, defaultValue = "0") Integer idadeMinima,
			@RequestParam(value = "idadeMaxima", required = false, defaultValue = "30") Integer idadeMaxima,
			@RequestParam(value = "rendaMinima", required = false, defaultValue = "0") Double rendaMinima,
			@RequestParam(value = "rendaMaxima", required = false, defaultValue = "10000") Double rendaMaxima) {
		return this.processoSeletivoService.findAllByPerfil(idadeMinima,
				idadeMaxima, rendaMinima, rendaMaxima);
	}

	@RequestMapping(value = "/adicionarCandidatoProcesso/{idProcesso}/{idCandidato}/{nivel}", method = RequestMethod.POST)
	public @ResponseBody CandidatoProcessoSeletivo adicionarCandidatoProcesso(
			@PathVariable Long idProcesso, @PathVariable Integer nivel,
			@PathVariable Long idCandidato) throws CrudResourceException,
			ProcessoSeletivoException {
		return this.processoSeletivoService.adicionarCandidatoProcesso(
				idProcesso, nivel, idCandidato);
	}

	@RequestMapping(value = "/listarCandidatosProcesso/{idProcesso}", method = RequestMethod.GET)
	public @ResponseBody List<CandidatoProcessoSeletivo> listarCandidatosProcesso(
			@PathVariable Long idProcesso) throws CrudResourceException {
		return this.processoSeletivoService
				.listarCandidatosProcesso(idProcesso);
	}

	@RequestMapping(value = "/listarPorNivel/{idProcesso}", method = RequestMethod.GET)
	public @ResponseBody List<CandidatoProcessoSeletivo> listarPorNivel(
			@RequestParam Integer[] niveis, @PathVariable Long idProcesso) {
		return processoSeletivoService.listarPorNivel(idProcesso,
				Arrays.asList(niveis));
	}

	@RequestMapping(value = "/listarCandidatosForaProcesso/{idProcesso}", method = RequestMethod.GET)
	public @ResponseBody List<Candidato> listarCandidatosForaProcesso(
			@PathVariable Long idProcesso,
			@RequestParam(required = false, defaultValue = "", value = "nome") String nome)
			throws CrudResourceException {
		return processoSeletivoService.listarCandidatosForaProcesso(idProcesso,
				nome);
	}

	@RequestMapping(value = "/avaliacao/{idCandidatoProcesso}", method = RequestMethod.POST)
	public @ResponseBody Avaliacao atualizarAvaliacaoCandidatoProcesso(
			@PathVariable Long idCandidatoProcesso, @RequestBody Avaliacao ava)
			throws CrudResourceException {
		CandidatoProcessoSeletivo cps = candidatoProcessoSeletivoService
				.buscar(idCandidatoProcesso);
		cps.setAvaliacao(ava);
		CandidatoProcessoSeletivo cpsNew = candidatoProcessoSeletivoService
				.salvar(cps);

		return cpsNew.getAvaliacao();
	}

	@RequestMapping(value = "/avaliacao/{idAvaliacao}", method = RequestMethod.PUT)
	public @ResponseBody Avaliacao adicionarAvaliacaoCandidatoProcesso(
			@RequestBody CandidatoProcessoSeletivo cps,
			@RequestBody Avaliacao ava) throws CrudResourceException {
		cps.setAvaliacao(ava);
		CandidatoProcessoSeletivo cpsNew = candidatoProcessoSeletivoService
				.salvar(cps);

		return cpsNew.getAvaliacao();
	}

	@RequestMapping(value = "/avaliacao/{idCandidatoProcesso}", method = RequestMethod.DELETE)
	public @ResponseBody void removerAvaliacaoDoCandidatoProcessoSeletivo(
			@PathVariable Long idCandidatoProcesso)
			throws CrudResourceException {
		CandidatoProcessoSeletivo cps = candidatoProcessoSeletivoService
				.buscar(idCandidatoProcesso);
		cps.setAvaliacao(null);
		candidatoProcessoSeletivoService.salvar(cps);
	}

	@RequestMapping(value = "/entrevista/{idCandidatoProcesso}", method = {
			RequestMethod.POST, RequestMethod.PUT })
	public @ResponseBody Entrevista salvarEntrevista(
			@RequestBody Entrevista entrevista,
			@PathVariable Long idCandidatoProcesso)
			throws CrudResourceException {
		CandidatoProcessoSeletivo cps = candidatoProcessoSeletivoService
				.buscar(idCandidatoProcesso);

		if (cps == null) {
			return new Entrevista();
		}

		cps.setEntrevista(entrevista);

		return candidatoProcessoSeletivoService.salvar(cps).getEntrevista();
	}

	@RequestMapping(value = "/entrevista/{idCandidatoProcesso}", method = RequestMethod.DELETE)
	public @ResponseBody void excluirEntrevista(
			@PathVariable Long idCandidatoProcesso)
			throws CrudResourceException {
		CandidatoProcessoSeletivo cps = candidatoProcessoSeletivoService
				.buscar(idCandidatoProcesso);

		if (cps == null) {
			return;
		}

		cps.setEntrevista(null);
		candidatoProcessoSeletivoService.salvar(cps);
	}

	@RequestMapping(value = "/listarCandidatosAprovados/{idProcesso}", method = RequestMethod.GET)
	public @ResponseBody List<Candidato> listarCandidatosAprovados(
			@PathVariable Long idProcesso) throws CrudResourceException {
		return processoSeletivoService.listarCandidatosAprovados(idProcesso);
	}

	@RequestMapping(value = "/listarProcessosConcluidos", method = RequestMethod.GET)
	public @ResponseBody List<ProcessoSeletivo> listarProcessosCandidatos() {
		return processoSeletivoService.listarProcessosComCandidatosAprovados();
	}
	
	 @RequestMapping(value = "imprimirRelatorio", method = RequestMethod.GET)
		public void imprimirRelatorio(HttpServletResponse response) throws IOException, JRException, SQLException {
		 processoSeletivoService.imprimirRelatorio(response, dataSource.getConnection());	
	 }
	 
	 @RequestMapping(value = "/relatorioProcessoSeletivo/{processoid}", method = RequestMethod.GET)
		public void imprimirRelatorioProcesso(
				@PathVariable Integer processoid, HttpServletResponse response) throws IOException, JRException, SQLException {
		 processoSeletivoService.imprimirRelatorioProcesso(processoid, response, dataSource.getConnection());
		}


	@RequestMapping(value = "/filtrar/{pagina}/{ordenar}", method = RequestMethod.GET)
	public @ResponseBody ResponseEntity<DataPage<ProcessoSeletivo>> filtrar(
			@RequestParam(value = "descricao", required = false, defaultValue = "") String descricao,
			@RequestParam(value = "datainicio", required = false, defaultValue = "") String dataInicio,
			@RequestParam(value = "datafim", required = false, defaultValue = "") String dataFim,
			@PathVariable Integer pagina, @PathVariable String ordenar) {

		SimpleDateFormat sdfFormat = new SimpleDateFormat(
				DateUtils.FORMATO_AMERICANO);
		Date dataInicioConvertida;
		Date dataFimConvertida;

		try {
			if (dataInicio.isEmpty()) {
				dataInicio = DateUtils.PRIMEIRA_DATA_DEFAULT;
			}
			if (dataFim.isEmpty()) {
				dataFim = sdfFormat.format(new Date());
			}

			dataInicioConvertida = sdfFormat.parse(dataInicio);
			dataFimConvertida = sdfFormat.parse(dataFim);
		} catch (ParseException e) {
			return new ResponseEntity<DataPage<ProcessoSeletivo>>(
					HttpStatus.BAD_REQUEST);
		}

		try {
			return new ResponseEntity<DataPage<ProcessoSeletivo>>(
					this.processoSeletivoService.findByDataAndDescricao(
							dataInicioConvertida, dataFimConvertida, descricao,
							pagina, ordenar), HttpStatus.OK);
		} catch (IllegalArgumentException ex) {
			return new ResponseEntity<DataPage<ProcessoSeletivo>>(
					HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}