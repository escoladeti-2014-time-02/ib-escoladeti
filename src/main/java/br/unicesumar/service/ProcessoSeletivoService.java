package br.unicesumar.service;

/**
 *
 * @author Matcher
 */
import static br.unicesumar.datapage.DataPage.pageRequestForAsc;
import static br.unicesumar.util.date.DateUtils.getDataAniversarioByIdade;

import java.io.IOException;
import java.io.OutputStream;
import java.math.BigInteger;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JRExporterParameter;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.export.JRPdfExporter;

import org.jboss.logging.Logger;
import org.jfree.date.DateUtilities;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.unicesumar.datapage.DataPage;
import br.unicesumar.entity.Candidato;
import br.unicesumar.entity.CandidatoProcessoSeletivo;
import br.unicesumar.entity.EmpresaProcessoSeletivo;
import br.unicesumar.entity.NivelCandidatoProcesso;
import br.unicesumar.entity.PerfilCandidatoProcesso;
import br.unicesumar.entity.ProcessoSeletivo;
import br.unicesumar.entity.StatusProcessoSeletivo;
import br.unicesumar.exception.CrudResourceException;
import br.unicesumar.exception.ProcessoSeletivoException;
import br.unicesumar.repository.CandidatoProcessoSeletivoRepository;
import br.unicesumar.repository.EmpresaProcessoSeletivoRepository;
import br.unicesumar.repository.PerfilCandidatoProcessoRepository;
import br.unicesumar.repository.ProcessoSeletivoRepository;
import br.unicesumar.util.string.StringUtils;

@Service
public class ProcessoSeletivoService {

	private static final Logger logger = Logger
			.getLogger(ProcessoSeletivoService.class);

	private static final String nomeArquivoRelatorioJasper = "processoseletivo.jasper";
	
	@Autowired
	private ProcessoSeletivoRepository repoProcessoSeletivo;

	@Autowired
	private CandidatoProcessoSeletivoRepository repoCandidatoPs;

	@Autowired
	private CandidatoService candidatoService;

	@Autowired
	private EmpresaProcessoSeletivoRepository repoEmpresaPs;

	@Autowired
	private EmpresaService empresaService;

	@Autowired
	private PerfilCandidatoProcessoRepository repoPerfilCandidatoProcesso;

	@Autowired
	private CandidatoService svcCandidato;

	@Transactional
	public DataPage<CandidatoProcessoSeletivo> listarPorNivel(Long idProcesso,
			List<Integer> niveis, Integer pagina) {
		
		ProcessoSeletivo processo = this.repoProcessoSeletivo
				.findOne(idProcesso);

		if (isPrimeiroNivel(niveis)) {
			PerfilCandidatoProcesso perfil = processo.getPerfilCandidato();
			
			List<Candidato> candidatosNaoSelecionados = findAllByPerfil(
					perfil.getIdadeMinima(),
					perfil.getIdadeMaxima(),
					perfil.getRendaMinima(),
					perfil.getRendaMaxima());
			
			if (candidatosNaoSelecionados.size() > 0) {
				for (Candidato candidato : candidatosNaoSelecionados) {
					processo.adicionarNovoCandidatoProcesso(candidato, 1);
				}
				getRepo().save(processo);
			}
		}
		
		return  new DataPage<CandidatoProcessoSeletivo>(
				repoCandidatoPs.findByNivel(idProcesso, getNiveis(niveis), pageRequestForAsc(pagina, "descricao")));
	}
	
	private List<NivelCandidatoProcesso> getNiveis(List<Integer> niveis) {
		List<NivelCandidatoProcesso> niveisCandidatoProcesso = new ArrayList<NivelCandidatoProcesso>();

		for (Integer n : niveis) {
			niveisCandidatoProcesso.add(NivelCandidatoProcesso.get(n));
		}

		return niveisCandidatoProcesso;
	}

	private boolean isPrimeiroNivel(List<Integer> niveis) {

		if (!niveis.isEmpty()) {
			return StatusProcessoSeletivo.PRE_SELECAO
					.equals(StatusProcessoSeletivo.get(niveis.get(0)));
		}
		return false;
	}

	@SuppressWarnings("unused")
	private boolean existeCandidatoNoProcesso(ProcessoSeletivo processo) {
		return processo.getCandidatosProcessoSeletivo().size() > 0;
	}

	public List<Candidato> findAllByPerfil(Integer idadeMinima,
			Integer idadeMaxima, Double rendaMinima, Double rendaMaxima) {
		return this.svcCandidato.findByPerfil(rendaMinima, rendaMaxima,
				getDataAniversarioByIdade(idadeMaxima),
				getDataAniversarioByIdade(idadeMinima));
	}

	@Transactional(readOnly = true)
	public List<Candidato> findAllByPerfil(Long idPerfilProcesso) {
		PerfilCandidatoProcesso perfilCandidato = this.repoPerfilCandidatoProcesso
				.findOne(idPerfilProcesso);

		if (perfilCandidato == null) {
			return new ArrayList<Candidato>();
		}

		return findAllByPerfil(
				perfilCandidato.getIdadeMinima(),
				perfilCandidato.getIdadeMaxima(),
				perfilCandidato.getRendaMinima(),
				perfilCandidato.getRendaMaxima());
	}

	@Transactional
	public EmpresaProcessoSeletivo adicionarEmpresaAoProcesso(
			EmpresaProcessoSeletivo empresaProcesso, Long idProcesso)
			throws ProcessoSeletivoException {
		ProcessoSeletivo processoManaged = getRepo().findOne(idProcesso);
		processoManaged.adicionarEmpresaProcesso(empresaProcesso);
		empresaProcesso.setProcessoSeletivo(processoManaged);

		return this.repoEmpresaPs.save(empresaProcesso);
	}

	@Transactional
	public void removerEmpresaDoProcesso(Long idEmpresa) {
		EmpresaProcessoSeletivo empresaManaged = this.repoEmpresaPs
				.findOne(idEmpresa);
		if (empresaManaged != null) {
			this.repoEmpresaPs.delete(empresaManaged);
		}
	}

	public ProcessoSeletivo salvar(ProcessoSeletivo entidade)
			throws CrudResourceException {
		return this.getRepo().save(entidade);
	}

	public ProcessoSeletivo atualizar(ProcessoSeletivo entidade)
			throws CrudResourceException {
		return this.getRepo().save(entidade);
	}

	public void excluir(ProcessoSeletivo entidade) throws CrudResourceException {
		this.getRepo().delete(entidade);
	}

	public List<ProcessoSeletivo> listarTodas() throws CrudResourceException {
		return this.getRepo().findAll();
	}

	public ProcessoSeletivo buscar(Long id) throws CrudResourceException {
		return this.getRepo().findOne(id);
	}

	public DataPage<ProcessoSeletivo> listarPaginado(Integer numeroPagina,
			String busca) {
		Page<ProcessoSeletivo> lista = this.getRepo()
				.findByDescricaoContainingIgnoreCase(busca,
						pageRequestForAsc(numeroPagina, "descricao"));
		return new DataPage<>(lista);
	}

	public List<EmpresaProcessoSeletivo> listarEmpresasDisponiveisProcesso(
			Long idProcesso) {
		return this.empresaService
				.listarEmpresasNaoParticipantesDoProcesso(idProcesso);
	}

	public List<EmpresaProcessoSeletivo> listarEmpresasDoProcesso(
			Long idProcesso) {
		return this.empresaService.listarEmpresasDoProcesso(idProcesso);
	}

	public ProcessoSeletivo atualizarEtapaProcesso(Long idProcesso,
			Integer etapa) throws CrudResourceException {
		ProcessoSeletivo ps = this.buscar(idProcesso);

		if (ps != null) {
			ps.setStatusProcessoSeletivo(StatusProcessoSeletivo.get(etapa));
			return this.atualizar(ps);
		}

		return new ProcessoSeletivo();
	}

	public void atualizarCandidatoProcesso(
			Long idCandidatoProcesso, Integer nivel) {
		NivelCandidatoProcesso novoNivelCandidato = null;

		try {
			novoNivelCandidato = NivelCandidatoProcesso.get(nivel);
			logger.debug("O nível do candidato foi encontrado: "
					+ novoNivelCandidato);

			if (novoNivelCandidato == null) {
				throw new ProcessoSeletivoException(String.format(
						"O nível %d não existe", nivel));
			}
			
			repoCandidatoPs.alterarNivelCandidato(idCandidatoProcesso, novoNivelCandidato);		
		} catch (Exception e) {
			logger.error(e.getMessage());
		}
	}

	public CandidatoProcessoSeletivo adicionarCandidatoProcesso(
			Long idProcesso, Integer nivel, Long idCandidato)
			throws CrudResourceException, ProcessoSeletivoException {

		ProcessoSeletivo processoSeletivo = this.buscar(idProcesso);

		if (processoSeletivo == null) {
			logger.error("O processo seletivo não existe!");
			return new CandidatoProcessoSeletivo();
		}

		Candidato candidato = candidatoService.findById(idCandidato);
		if (candidato == null) {
			throw new ProcessoSeletivoException(
					"Não é possível adicionar um candidato que não existe ao processo seletivo");
		}

		CandidatoProcessoSeletivo novoCandidato = processoSeletivo
				.adicionarNovoCandidatoProcesso(candidato, nivel);

		try {
			salvar(processoSeletivo);
			return novoCandidato;
		} catch (Exception e) {
			logger.error(e);
		}

		return new CandidatoProcessoSeletivo();
	}
	
	public DataPage<CandidatoProcessoSeletivo> alterarNivelDeCandidatos(
			Long idProcesso, List<Integer> niveisAtuais, Integer novoNivel){
			
		List<Long> idCandidatos = listarIdCandidatos(idProcesso, niveisAtuais);
		
		this.repoCandidatoPs.alterarNivelCandidatos(idCandidatos, NivelCandidatoProcesso.get(novoNivel));
		
		List<Integer> novoNiveis = new ArrayList<Integer>();
		novoNiveis.add(novoNivel);
		
		return listarPorNivel(idProcesso, novoNiveis, 1);
	}
	
	/*
	 * List<CandidatoProcessoSeletivo> candidatos = listarPorNivel(idProcesso, niveisAtuais);
		for (CandidatoProcessoSeletivo c : candidatos) {
			c.setNivelCandidatoProcesso(NivelCandidatoProcesso.get(novoNivel));
		}
		this.repoCandidatoPs.save(candidatos);
		
		List<Integer> novoNiveis = new ArrayList<Integer>();
		novoNiveis.add(novoNivel);
		
		return listarPorNivel(idProcesso, novoNiveis, 1);
	 */

	public List<CandidatoProcessoSeletivo> listarCandidatosProcesso(
			Long idProcesso) throws CrudResourceException {

		ProcessoSeletivo processoSeletivo = buscar(idProcesso);

		if (processoSeletivo != null) {
			return processoSeletivo.getCandidatosProcessoSeletivo();
		}

		return Collections.emptyList();
	}

	public List<CandidatoProcessoSeletivo> listarPorNivel(Long idProcesso,
			List<Integer> niveis) {
		return this.repoCandidatoPs.findByNivel(idProcesso, getNiveis(niveis));
	}
	
	public List<Long> listarIdCandidatos(Long idProcesso,
			List<Integer> niveis) {
		return this.repoCandidatoPs.findIdsByNivel(idProcesso, getNiveis(niveis));
	}

	@Transactional(readOnly = true)
	public List<Candidato> listarCandidatosForaProcesso(Long idProcesso,
			String nome) throws CrudResourceException {
		ProcessoSeletivo processo = this.buscar(idProcesso);

		if (processo == null) {
			return Collections.emptyList();
		}

		List<Object[]> listaBanco = this.repoCandidatoPs.findAllForaProcesso(
				idProcesso,
				StringUtils.Query.addLikeCaracters(nome.toUpperCase()));
		List<Candidato> retorno = new ArrayList<Candidato>();

		for (Object[] row : listaBanco) {
			try {
				retorno.add(new Candidato(((BigInteger) row[0]).longValue(),
						(String) row[1]));
			} catch (ArrayIndexOutOfBoundsException ex) {
				logger.warn("Problemas ao listar candidatos fora do processo.\n"
						+ "A busca não está retornando o número de colunas que deveria!");
			}
		}
		return retorno;
	}

	public List<Candidato> listarCandidatosAprovados(Long idProcesso)
			throws CrudResourceException {
		ProcessoSeletivo processoSeletivo = buscar(idProcesso);

		if (processoSeletivo == null) {
			return new ArrayList<>();
		}

		return repoCandidatoPs.findCandidatoByNivelProcesso(idProcesso,
				StatusProcessoSeletivo.AVALIACAO,
				NivelCandidatoProcesso.APROVADO);
	}

	@Transactional(readOnly = true)
	public List<ProcessoSeletivo> listarProcessosComCandidatosAprovados() {
		List<ProcessoSeletivo> processos = repoProcessoSeletivo
				.listarProcessosConcluidos(StatusProcessoSeletivo.AVALIACAO);
		List<ProcessoSeletivo> processosSelecionados = new ArrayList<ProcessoSeletivo>();

		for (ProcessoSeletivo ps : processos) {
			if (!ps.getCandidatosProcessoSeletivo().isEmpty()) {
				processosSelecionados.add(ps);
			}
		}

		return processosSelecionados;
	}

	@Transactional(readOnly = true)
	public DataPage<ProcessoSeletivo> findByDataAndDescricao(Date dataInicio,
			Date dataFim, String descricao, Integer numeroPagina,
			String nomeAtributo) {

		if (dataFim.compareTo(dataInicio) < 0) {
			throw new IllegalArgumentException(
					"A data final, não pode ser menor do que a inicial");
		}

		if (nomeAtributo == null || nomeAtributo.isEmpty()) {
			nomeAtributo = ProcessoSeletivo.DESCRICAO;
		}

		return new DataPage<ProcessoSeletivo>(
				this.repoProcessoSeletivo.findAllByDataAndDescricao(dataInicio,
						dataFim, StringUtils.Query.addLikeCaracters(descricao
								.toUpperCase()), DataPage.pageRequestForAsc(
								numeroPagina, nomeAtributo)));
	}

	public DataPage<ProcessoSeletivo> findAllProcessosVencidos(
			String descricao, String nomeAtributo, Integer numeroPagina) {

		return findByDataAndDescricao(DateUtilities.createDate(1900, 01, 01),
				new Date(), descricao.toUpperCase(), numeroPagina, nomeAtributo);
	}
	
	public void imprimirRelatorio(HttpServletResponse response, Connection connection) throws IOException, JRException, SQLException {
		response.setHeader("Content-Disposition", "inline; filename=listagemProcessoSeletivo.pdf");
        HashMap<String, Object> params = new HashMap<>();

        String reportStream = DisciplinaService.class.getProtectionDomain().getCodeSource().getLocation().getPath();
        String diretorioProjeto = reportStream.substring(1, reportStream.indexOf("springrest")) ;
        diretorioProjeto = diretorioProjeto + "springrest/resources/relatorios/";

        reportStream = diretorioProjeto + nomeArquivoRelatorioJasper;

        params.put("diretorioProjeto", reportStream);
        params.put("diretorio", diretorioProjeto);

        OutputStream out = response.getOutputStream();

        JasperPrint jp = JasperFillManager.fillReport(reportStream, params, connection);

        JRPdfExporter exporter = new JRPdfExporter();

        exporter.setParameter(JRExporterParameter.JASPER_PRINT, jp);
        exporter.setParameter(JRExporterParameter.OUTPUT_STREAM, out);

        exporter.exportReport();
	}
	
	public void imprimirRelatorioProcesso(Integer processoSeletivoId,
			HttpServletResponse response, Connection connection) throws IOException, JRException, SQLException {
		response.setHeader("Content-Disposition", "inline; filename=processo_seletivo_completo.pdf");
        HashMap<String, Object> params = new HashMap<>();
        
        params.put("processoid", processoSeletivoId);

        String reportStream = ProcessoSeletivoService.class.getProtectionDomain().getCodeSource().getLocation().getPath();
        String diretorioProjeto = reportStream.substring(1, reportStream.indexOf("springrest")) ;
        diretorioProjeto = diretorioProjeto + "springrest/resources/relatorios/";

        reportStream = diretorioProjeto + "processoseletivocompleto.jasper";

        params.put("diretorioProjeto", reportStream);
        params.put("diretorio", diretorioProjeto);

        OutputStream out = response.getOutputStream();

        JasperPrint jp = JasperFillManager.fillReport(reportStream, params, connection);

        JRPdfExporter exporter = new JRPdfExporter();

        exporter.setParameter(JRExporterParameter.JASPER_PRINT, jp);
        exporter.setParameter(JRExporterParameter.OUTPUT_STREAM, out);

        exporter.exportReport();
	}

	/*
	 * GETTERS E SETTERS
	 */
	public ProcessoSeletivoRepository getRepo() {
		return this.repoProcessoSeletivo;
	}
}