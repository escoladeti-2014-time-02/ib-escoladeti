package br.unicesumar.service;

import static br.unicesumar.datapage.DataPage.pageRequestForAsc;
import static br.unicesumar.datapage.DataPage.pageRequestForDesc;

import java.io.IOException;
import java.io.OutputStream;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JRExporterParameter;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.export.JRPdfExporter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.unicesumar.datapage.DataPage;
import br.unicesumar.entity.Aluno;
import br.unicesumar.entity.EmpresaTurma;
import br.unicesumar.entity.TipoEvento;
import br.unicesumar.entity.Turma;
import br.unicesumar.exception.CandidatoException;
import br.unicesumar.exception.CrudResourceException;
import br.unicesumar.repository.TurmaRepository;
import br.unicesumar.util.date.DateUtils;
import br.unicesumar.util.string.StringUtils;

@Service
public class TurmaService extends CrudServiceTemplate<Turma> {

	@Autowired
	private TurmaRepository turmaRepository;

	@Autowired
	private EventoService eventoService;

	private static final String nomeArquivoRelatorioJasper = "turma.jasper";

	public DataPage<Turma> listarPaginado(Integer numeroPagina,
			String argumentoBusca) throws CrudResourceException {
		return new DataPage<Turma>(getRepo().findByNomeContainingIgnoreCase(
				argumentoBusca, pageRequestForAsc(numeroPagina, "nome")));
	}

	public List<EmpresaTurma> getEmpresasTurma(Long idTurma)
			throws CrudResourceException {
		Turma turma = buscar(idTurma);

		if (turma == null) {
			return new ArrayList<EmpresaTurma>();
		}

		return turma.getEmpresaTurma();
	}

	public List<Aluno> getAlunos(Long idTurma) throws CrudResourceException {
		Turma turma = buscar(idTurma);

		if (turma == null) {
			return new ArrayList<>();
		}

		return turma.getAluno();
	}

	public DataPage<Turma> filtrar(String nome, String orderBy,
			Integer numeroPagina, Boolean turmaFechada, Boolean desc) {

		String descricaoLike = StringUtils.Query.addLikeCaracters(nome)
				.toUpperCase();
		Date dataEncerramento = turmaFechada ? new Date() : null;

		return new DataPage<Turma>(this.turmaRepository.findAllByDescricao(
				descricaoLike, dataEncerramento,
				desc ? pageRequestForDesc(numeroPagina, orderBy)
						: pageRequestForAsc(numeroPagina, orderBy)));
	}

	public DataPage<Aluno> getAlunos(Integer numeroPagina, Long idTurma) {
		return new DataPage<Aluno>(this.turmaRepository.findAllAlunosByTurma(
				idTurma, pageRequestForAsc(numeroPagina, "nome")));
	}

	public DataPage<Aluno> getAlunosByNome(Long idTurma, Integer numeroPagina,
			String nome) {
		return new DataPage<Aluno>(
				this.turmaRepository.findAllAlunosByTurmaAndNome(idTurma,
						StringUtils.Query.addLikeCaracters(nome).toUpperCase(),
						pageRequestForAsc(numeroPagina, "nome")));
	}

	public Turma getTurmaByAluno(Long idAluno) {
		return this.turmaRepository.findTurmaByAluno(idAluno);
	}

	public List<Turma> findByNome(String nome) {
		return this.turmaRepository.findByNomeContainingIgnoreCase(nome);
	}
	
	public void imprimirRelatorio(HttpServletResponse response, Connection connection) throws IOException, JRException, SQLException {
		response.setHeader("Content-Disposition", "inline; filename=listagemTurma.pdf");
        HashMap<String, Object> params = new HashMap<>();

		String reportStream = ModuloService.class.getProtectionDomain()
				.getCodeSource().getLocation().getPath();
		String diretorioProjeto = reportStream.substring(1,
				reportStream.indexOf("springrest"));
		diretorioProjeto = diretorioProjeto
				+ "springrest/resources/relatorios/";

		reportStream = diretorioProjeto + nomeArquivoRelatorioJasper;

		params.put("diretorioProjeto", reportStream);
		params.put("diretorio", diretorioProjeto);

		OutputStream out = response.getOutputStream();

		JasperPrint jp = JasperFillManager.fillReport(reportStream, params,
				connection);

		JRPdfExporter exporter = new JRPdfExporter();

		exporter.setParameter(JRExporterParameter.JASPER_PRINT, jp);
		exporter.setParameter(JRExporterParameter.OUTPUT_STREAM, out);

		exporter.exportReport();
	}

	public void imprimirRelatorioTurma(Integer turmaId,
			HttpServletResponse response, Connection connection)
			throws IOException, JRException, SQLException {
		response.setHeader("Content-Disposition", "inline; filename=Turma.pdf");
		HashMap<String, Object> params = new HashMap<>();

		params.put("TURMA_ID", turmaId);

		String reportStream = ModuloService.class.getProtectionDomain()
				.getCodeSource().getLocation().getPath();
		String diretorioProjeto = reportStream.substring(1,
				reportStream.indexOf("springrest"));
		diretorioProjeto = diretorioProjeto
				+ "springrest/resources/relatorios/";

		reportStream = diretorioProjeto + "RelTurma.jasper";

		params.put("diretorioProjeto", reportStream);
		params.put("diretorio", diretorioProjeto);

		OutputStream out = response.getOutputStream();

		JasperPrint jp = JasperFillManager.fillReport(reportStream, params,
				connection);

		JRPdfExporter exporter = new JRPdfExporter();

		exporter.setParameter(JRExporterParameter.JASPER_PRINT, jp);
		exporter.setParameter(JRExporterParameter.OUTPUT_STREAM, out);

		exporter.exportReport();
	}

	/* Início dos métodos de automatização dos eventos */
	@Override
	public Turma salvar(Turma entidade) {
		Turma retorno = getRepo().save(entidade);
		try {
			gerarEventoTurma(retorno);
		} catch (CandidatoException e) {
			e.printStackTrace();
		} catch (CrudResourceException e) {
			e.printStackTrace();
		}
		return retorno;
	}
	
	@Override
	public Turma atualizar(Turma entidade) {
		List<Aluno> alunosNovos = getAlunosNovos(entidade);
		Turma retorno = getRepo().saveAndFlush(entidade);
		gerarEventoAlunos(alunosNovos, entidade);
		return retorno;
	}

	private void gerarEventoAlunos(List<Aluno> alunosNovos, Turma turma) {
		TipoEvento tipo = new TipoEvento();
		tipo.setId(8L);
		for (Aluno aluno : alunosNovos) {
			try {
				addEvento(turma, tipo, aluno);
			} catch (CandidatoException e) {
				e.printStackTrace();
			} catch (CrudResourceException e) {
				e.printStackTrace();
			}
		}

	}

	private List<Aluno> getAlunosNovos(Turma entidade) {
		List<Aluno> alunosNovos = new ArrayList<Aluno>();
		for (Aluno aluno : entidade.getAluno()) {
			if (aluno.isNovo()) {
				alunosNovos.add(aluno);
			}
		}
		return alunosNovos;
	}

	private void gerarEventoTurma(Turma turma) throws CandidatoException,
			CrudResourceException {
		TipoEvento tipo = new TipoEvento();
		tipo.setId(8L);
		for (Aluno aluno : turma.getAluno()) {
			addEvento(turma, tipo, aluno);
		}
	}
	
	public void imprimirRelatorioFaltasTurma(Integer turmaId,
			HttpServletResponse response, Connection connection) throws IOException, JRException, SQLException {
		response.setHeader("Content-Disposition", "inline; filename=Turma.pdf");
        HashMap<String, Object> params = new HashMap<>();
        
        params.put("TURMA_ID", turmaId);

        String reportStream = ModuloService.class.getProtectionDomain().getCodeSource().getLocation().getPath();
        String diretorioProjeto = reportStream.substring(1, reportStream.indexOf("springrest")) ;
        diretorioProjeto = diretorioProjeto + "springrest/resources/relatorios/";

        reportStream = diretorioProjeto + "frequenciaAlunosTurma.jasper";

        params.put("diretorioProjeto", reportStream);
        params.put("diretorio", diretorioProjeto);
        params.put("turmaid", turmaId);

        OutputStream out = response.getOutputStream();

        JasperPrint jp = JasperFillManager.fillReport(reportStream, params, connection);

        JRPdfExporter exporter = new JRPdfExporter();

        exporter.setParameter(JRExporterParameter.JASPER_PRINT, jp);
        exporter.setParameter(JRExporterParameter.OUTPUT_STREAM, out);

        exporter.exportReport();
	}

	private void addEvento(Turma turma, TipoEvento tipo, Aluno aluno)
			throws CandidatoException, CrudResourceException {
		getEventoService()
				.adicionarEventoCandidato(
						aluno.getCandidato().getId(),
						"Início das atividades escolares",
						"O aluno ingressou na turma "
								+ turma.getNome()
								+ ", com início das atividades escolares em "
								+ DateUtils.formatar(turma.getDataInicio())
								+ System.lineSeparator()
								+ "e término previsto para "
								+ DateUtils.formatar(turma
										.getDataEncerramento()) + ".", tipo);
	}

	public EventoService getEventoService() {
		return eventoService;
	}

	public void setEventoService(EventoService eventoService) {
		this.eventoService = eventoService;
	}

	/* Fim dos métodos de automatização dos eventos */
	
	/*
	 * GETTERS E SETTERS
	 */
	@Override
	public TurmaRepository getRepo() {
		return turmaRepository;
	}


}