package br.unicesumar.service;

import static br.unicesumar.datapage.DataPage.pageRequestForAsc;

import java.io.IOException;
import java.io.OutputStream;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.HashMap;

import javax.servlet.http.HttpServletResponse;

import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JRExporterParameter;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.export.JRPdfExporter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.unicesumar.datapage.DataPage;
import br.unicesumar.entity.Disciplina;
import br.unicesumar.exception.CrudResourceException;
import br.unicesumar.repository.DisciplinaRepository;

/**
 * @author Melina
 */


@Service
public class DisciplinaService extends CrudServiceTemplate<Disciplina>{
	
	@Autowired
    private DisciplinaRepository disciplinaRepository;
	
	private static final String nomeArquivoRelatorioJasper = "disciplina.jasper";

	public DataPage<Disciplina> listarPaginado(Integer numeroPagina, String argumentoBusca) throws CrudResourceException {
		return new DataPage<Disciplina>(getRepo().findByNomeContainingIgnoreCase(argumentoBusca, pageRequestForAsc(numeroPagina, "nome")));
	}
	
	public void imprimirRelatorio(HttpServletResponse response, Connection connection) throws IOException, JRException, SQLException {
		response.setHeader("Content-Disposition", "inline; filename=listagemDisciplina.pdf");
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
	
	public void imprimirRelatorioFaltasDisciplina(Integer disciplinaid,
			HttpServletResponse response, Connection connection) throws IOException, JRException, SQLException {
		response.setHeader("Content-Disposition", "inline; filename=frequenciaAlunosDisciplina.pdf");
        HashMap<String, Object> params = new HashMap<>();

        String reportStream = DisciplinaService.class.getProtectionDomain().getCodeSource().getLocation().getPath();
        String diretorioProjeto = reportStream.substring(1, reportStream.indexOf("springrest")) ;
        diretorioProjeto = diretorioProjeto + "springrest/resources/relatorios/";

        reportStream = diretorioProjeto + "frequenciaAlunosDisciplina.jasper";

        params.put("diretorioProjeto", reportStream);
        params.put("diretorio", diretorioProjeto);
        params.put("disciplinaid", disciplinaid);

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
	@Override
	public DisciplinaRepository getRepo() {
		return disciplinaRepository;
	}

}
