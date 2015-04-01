package br.unicesumar.service;

import static br.unicesumar.datapage.DataPage.pageRequestForAsc;

import java.io.IOException;
import java.io.OutputStream;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JRExporterParameter;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.export.JRPdfExporter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.unicesumar.datapage.DataPage;
import br.unicesumar.entity.Candidato;
import br.unicesumar.entity.TipoEvento;
import br.unicesumar.exception.CandidatoException;
import br.unicesumar.exception.CrudResourceException;
import br.unicesumar.repository.CandidatoProcessoSeletivoRepository;
import br.unicesumar.repository.CandidatoRepository;

@Service
public class CandidatoService {
	
	private static final String nomeArquivoRelatorioJasper = "candidatos.jasper";
	private static final String nomeArquivoContratoJasper = "contratoTeste.jasper";

	@Autowired
	private CandidatoRepository candidatoRepository;
	
	@Autowired
	private CandidatoProcessoSeletivoRepository repoCandidatoProcessoSeletivo;
	
	@Autowired
	private EventoService eventoService;

	@Transactional
	public Candidato salvar(Candidato candidato) throws CandidatoException, CrudResourceException {
		Candidato retorno = getCandidatoRepository().save(candidato);
		gerarEventoCadastro(retorno);
		return retorno;
	}

	@Transactional
	public Candidato alterar(Candidato candidato) {
		return getCandidatoRepository().saveAndFlush(candidato);
	}

	@Transactional(readOnly = true)
	public DataPage<Candidato> listar(Integer page, String argumentoBusca) {
		return new DataPage<>(getCandidatoRepository().findByNomeContainingIgnoreCase(argumentoBusca, pageRequestForAsc(page, "nome")));
	}

	@Transactional
	public void apagar(Candidato candidato) {
		getCandidatoRepository().delete(candidato);
	}

	@Transactional
	public Candidato findById(Long id) {
		return getCandidatoRepository().findById(id);
	}

	@Transactional(readOnly = true)
	public List<Candidato> listar() {
		return getCandidatoRepository().findAll(new Sort(new Sort.Order(Sort.Direction.ASC, "nome")));
	}

	@Transactional(readOnly = true)
	public List<Candidato> findByPerfil(Double rendaMinima, Double rendaMaxima, Date dataInicial, Date dataFinal) {
		return this.getCandidatoRepository().findByFaixaRenda(rendaMinima, rendaMaxima, dataInicial, dataFinal);
	}
	
	@Transactional
	public List<Candidato> findByNome(String nome) {
		return this.getCandidatoRepository().findByNomeContainingIgnoreCase(nome);
	}

	public void imprimirRelatorio(HttpServletResponse response, Connection connection) throws IOException, JRException, SQLException {
		response.setHeader("Content-Disposition", "inline; filename=candidatos.pdf");
        HashMap<String, Object> params = new HashMap<>();

        String reportStream = CandidatoService.class.getProtectionDomain().getCodeSource().getLocation().getPath();
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

	
	public void gerarContrato(HttpServletResponse response, Connection connection, Map<String, Long> parametros) throws IOException, JRException, SQLException {
		response.setHeader("Content-Disposition", "inline; filename=contrato.pdf");
        HashMap<String, Object> params = new HashMap<>();

        String reportStream = CandidatoService.class.getProtectionDomain().getCodeSource().getLocation().getPath();
        String diretorioProjeto = reportStream.substring(1, reportStream.indexOf("springrest")) ;
        diretorioProjeto = diretorioProjeto + "springrest/resources/relatorios/";

        reportStream = diretorioProjeto + nomeArquivoContratoJasper;

        params.put("idCandidato", parametros.get("idCandidato"));
        params.put("idEmpresa", parametros.get("idEmpresa"));
        params.put("diretorioProjeto", reportStream);
        params.put("diretorio", diretorioProjeto);

        OutputStream out = response.getOutputStream();

        JasperPrint jp = JasperFillManager.fillReport(reportStream, params, connection);

        JRPdfExporter exporter = new JRPdfExporter();

        exporter.setParameter(JRExporterParameter.JASPER_PRINT, jp);
        exporter.setParameter(JRExporterParameter.OUTPUT_STREAM, out);

        exporter.exportReport();
	}
	
	public void gerarEventoCadastro(Candidato candidato) throws CandidatoException, CrudResourceException {		
		TipoEvento tipo = new TipoEvento();
		tipo.setId(7L);
		getEventoService().adicionarEventoCandidato(
				candidato.getId(), 
				"Cadastro", 
				"Cadastro realizado com sucesso", tipo);
	}
	
	/*
	 * GETTERS E SETTERS
	 */
	public CandidatoRepository getCandidatoRepository() {
		return candidatoRepository;
	}
	
	public EventoService getEventoService() {
		return eventoService;
	}
}