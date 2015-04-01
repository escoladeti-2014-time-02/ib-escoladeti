package br.unicesumar.service;

import static br.unicesumar.datapage.DataPage.pageRequestForAsc;

import java.io.IOException;
import java.io.OutputStream;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JRExporterParameter;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.export.JRPdfExporter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import br.unicesumar.datapage.DataPage;
import br.unicesumar.entity.DisciplinaModulo;
import br.unicesumar.entity.Modulo;
import br.unicesumar.repository.ModuloRepository;

/**
 * @author heidi 
 */

@Service
public class ModuloService extends CrudServiceTemplate<Modulo> {

	@Autowired
    private ModuloRepository moduloRepository;
	
	private static final String nomeArquivoRelatorioJasper = "modulo.jasper";

	public Modulo salvar(Modulo modulo){
		
		for(DisciplinaModulo dm : modulo.getDisciplinasModulo()) {
			dm.setModulo(modulo);
		}
		return getRepo().save(modulo);
	}

	public Modulo alterar(Modulo modulo){
		
		for(DisciplinaModulo dm : modulo.getDisciplinasModulo()) {
			dm.setModulo(modulo);
		}
		return getRepo().saveAndFlush(modulo);
	}
	
	public DataPage<Modulo> listar(Integer page){
		return new DataPage<>(getRepo().findAll(pageRequestForAsc(page, "nome")));
	}
	
	public void apagar(Modulo pessoaJuridica){
		getRepo().delete(pessoaJuridica);
	}
	
	public Modulo findById(Long id){
		return getRepo().findById(id);
	}
	
	public List<Modulo> listar(){
		return getRepo().findAll(new Sort(new Sort.Order(Sort.Direction.ASC, "nome")));
	}
	
	public void imprimirRelatorio(HttpServletResponse response, Connection connection) throws IOException, JRException, SQLException {
		response.setHeader("Content-Disposition", "inline; filename=listagemModulo.pdf");
        HashMap<String, Object> params = new HashMap<>();

        String reportStream = ModuloService.class.getProtectionDomain().getCodeSource().getLocation().getPath();
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
	
	public void imprimirRelatorioFaltasModulo(Integer moduloid,
			HttpServletResponse response, Connection connection) throws IOException, JRException, SQLException {
		response.setHeader("Content-Disposition", "inline; filename=frequenciaAlunosModulo.pdf");
        HashMap<String, Object> params = new HashMap<>();

        String reportStream = DisciplinaService.class.getProtectionDomain().getCodeSource().getLocation().getPath();
        String diretorioProjeto = reportStream.substring(1, reportStream.indexOf("springrest")) ;
        diretorioProjeto = diretorioProjeto + "springrest/resources/relatorios/";

        reportStream = diretorioProjeto + "frequenciaAlunosModulo.jasper";

        params.put("diretorioProjeto", reportStream);
        params.put("diretorio", diretorioProjeto);
        params.put("moduloid", moduloid);

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
	public ModuloRepository getRepo() {
		return moduloRepository;
	}
}
