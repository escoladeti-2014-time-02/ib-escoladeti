package br.unicesumar.service;

import static br.unicesumar.datapage.DataPage.pageRequestForAsc;

import java.io.IOException;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.Date;
import java.util.HashMap;

import javax.servlet.ServletOutputStream;
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
import br.unicesumar.entity.AlunoAula;
import br.unicesumar.entity.Aula;
import br.unicesumar.entity.Colaborador;
import br.unicesumar.entity.Disciplina;
import br.unicesumar.entity.Modulo;
import br.unicesumar.entity.TipoEvento;
import br.unicesumar.entity.Turma;
import br.unicesumar.exception.CandidatoException;
import br.unicesumar.exception.CrudResourceException;
import br.unicesumar.repository.AulaRepository;
import br.unicesumar.util.date.DateUtils;

@Service
public class AulaService extends CrudServiceTemplate<Aula> {

	@Autowired
	private AulaRepository aulaRepository;

	@Autowired
	private TurmaService turmaService;

	@Autowired
	private ModuloService moduloService;

	@Autowired
	private ColaboradorService colaboradorService;

	@Autowired
	private DisciplinaService disciplinaService;
	
	@Autowired
	private EventoService eventoService;

	public DataPage<Aula> listarPaginado(Integer numeroPagina,
			String argumentoBusca) throws CrudResourceException {
		return new DataPage<Aula>(getRepo()
				.findByDescricaoContainingIgnoreCase(argumentoBusca,
						pageRequestForAsc(numeroPagina, "dataAula")));
	}

	public DataPage<Aula> listarPaginadoSemBusca(Integer numeroPagina)
			throws CrudResourceException {
		return new DataPage<Aula>(getRepo().findAll(
				pageRequestForAsc(numeroPagina, "dataAula")));
	}

	@Override
	public AulaRepository getRepo() {
		return this.aulaRepository;
	}

	public Aula salvar(Aula aula, Long idTurma, Long idModulo,
			Long idDisciplina, Long idColaborador) throws CrudResourceException {

		Turma turma = this.turmaService.buscar(idTurma);
		Modulo modulo = this.moduloService.buscar(idModulo);
		Disciplina disciplina = this.disciplinaService.buscar(idDisciplina);
		Colaborador colaborador = this.colaboradorService.buscar(idColaborador);

		aula.setTurma(turma);
		aula.setModulo(modulo);
		aula.setDisciplina(disciplina);
		aula.setColaborador(colaborador);
		try {
			for (AlunoAula presenca : aula.getAlunoAula()) {
				if(!presenca.isPresenca()){
					gerarEventoPresenca(aula , presenca);}
			} 
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return getRepo().save(aula);
	}

	private void gerarEventoPresenca(Aula aula, AlunoAula alunoAula) throws CandidatoException,
	CrudResourceException{
		TipoEvento tipo = new TipoEvento();
		tipo.setId(10L);
		addEvento(aula, tipo, alunoAula.getAluno());
	}

	private void addEvento(Aula aula, TipoEvento tipo, Aluno aluno) throws CandidatoException, 
	CrudResourceException {
		
		getEventoService().adicionarEventoCandidato(aluno.getCandidato().getId(), 
				"Aluno faltou a aula", 
				"Aluno faltou a aula do dia: "+DateUtils.formatar(aula.getDataAula()), 
				tipo);
	}

	public EventoService getEventoService() {
		return eventoService;
	}

	public void setEventoService(EventoService eventoService) {
		this.eventoService = eventoService;
	}
	
	public DataPage<Aula> filtrar(Long idTurma, Long idModulo,
			Long idDisciplina, Date data, Integer numeroPagina)
			throws CrudResourceException {

		Turma turma = this.turmaService.buscar(idTurma);
		Modulo modulo = this.moduloService.buscar(idModulo);
		Disciplina disciplina = this.disciplinaService.buscar(idDisciplina);

		return new DataPage<>(this.getRepo()
				.findAllByTurmaAndModuloAndDisciplinaAndDataAula(turma, modulo,
						disciplina, data, pageRequestForAsc(numeroPagina, "dataAula")));
	}
	
	public void imprimirRelatorioFaltasAula(Integer aulaid,
			HttpServletResponse response, Connection connection) throws IOException, JRException, SQLException {
		response.setHeader("Content-Disposition", "inline; filename=frequenciaAlunosAula.pdf");
        HashMap<String, Object> params = new HashMap<>();

        String reportStream = DisciplinaService.class.getProtectionDomain().getCodeSource().getLocation().getPath();
        String diretorioProjeto = reportStream.substring(1, reportStream.indexOf("springrest")) ;
        diretorioProjeto = diretorioProjeto + "springrest/resources/relatorios/";

        reportStream = diretorioProjeto + "frequenciaAlunosAula.jasper";

        params.put("diretorioProjeto", reportStream);
        params.put("diretorio", diretorioProjeto);
        params.put("aulaid", aulaid);

        ServletOutputStream out = response.getOutputStream();

        JasperPrint jp = JasperFillManager.fillReport(reportStream, params, connection);

        JRPdfExporter exporter = new JRPdfExporter();

        exporter.setParameter(JRExporterParameter.JASPER_PRINT, jp);
        exporter.setParameter(JRExporterParameter.OUTPUT_STREAM, out);

        exporter.exportReport();
	}
	
	public void imprimirFrequenciaAlunos(HttpServletResponse response, Connection connection) throws IOException, JRException, SQLException {
		response.setHeader("Content-Disposition", "inline; filename=frequenciaAlunos.pdf");
        HashMap<String, Object> params = new HashMap<>();

        String reportStream = DisciplinaService.class.getProtectionDomain().getCodeSource().getLocation().getPath();
        String diretorioProjeto = reportStream.substring(1, reportStream.indexOf("springrest")) ;
        diretorioProjeto = diretorioProjeto + "springrest/resources/relatorios/";

        reportStream = diretorioProjeto + "frequenciaAlunos.jasper";

        params.put("diretorioProjeto", reportStream);
        params.put("diretorio", diretorioProjeto);

        ServletOutputStream out = response.getOutputStream();

        JasperPrint jp = JasperFillManager.fillReport(reportStream, params, connection);

        JRPdfExporter exporter = new JRPdfExporter();

        exporter.setParameter(JRExporterParameter.JASPER_PRINT, jp);
        exporter.setParameter(JRExporterParameter.OUTPUT_STREAM, out);

        exporter.exportReport();
	}
}