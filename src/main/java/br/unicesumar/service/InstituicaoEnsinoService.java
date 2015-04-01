package br.unicesumar.service;

import static br.unicesumar.datapage.DataPage.pageRequestForAsc;

import java.io.IOException;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;

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
import br.unicesumar.entity.InstituicaoEnsino;
import br.unicesumar.repository.InstituicaoEnsinoRepository;

/**
 *
 * @author Matcher
 */
@Service
public class InstituicaoEnsinoService {
    
    @Autowired
    private InstituicaoEnsinoRepository instituicaoEnsinoRepository;

    private static final String nomeArquivoRelatorioJasper = "listagemInstituicao.jasper";
    
    public InstituicaoEnsino salvar(InstituicaoEnsino instituicaoEnsino) {
        // lógica da aplicação
        return getInstituicaoEnsinoRepository().save(instituicaoEnsino);
    }

    public List<InstituicaoEnsino> listar() {
        return getInstituicaoEnsinoRepository().findAll();
    }
    
    public DataPage<InstituicaoEnsino> listar(Integer numeroPagina, String argumentoBusca) {
        return new DataPage<>(getInstituicaoEnsinoRepository().findByNomeContainingIgnoreCase(argumentoBusca, pageRequestForAsc(numeroPagina, "nome")));
    }
    
    public String apagar(InstituicaoEnsino instituicaoEnsino){
        getInstituicaoEnsinoRepository().delete(instituicaoEnsino);
        return "OK";
    }
    
    public InstituicaoEnsino findById(Long id){
        return getInstituicaoEnsinoRepository().findById(id);
    }
    
    public InstituicaoEnsino alterar(InstituicaoEnsino instituicaoEnsino){
        return getInstituicaoEnsinoRepository().saveAndFlush(instituicaoEnsino);
    }
    
    public void imprimirRelatorio(HttpServletResponse response, Connection connection) throws IOException, JRException, SQLException {
		response.setHeader("Content-Disposition", "inline; filename=listagemInstituicao.pdf");
        HashMap<String, Object> params = new HashMap<>();

        String reportStream = PessoaJuridicaService.class.getProtectionDomain().getCodeSource().getLocation().getPath();
        String diretorioProjeto = reportStream.substring(1, reportStream.indexOf("springrest")) ;
        diretorioProjeto = diretorioProjeto + "springrest/resources/relatorios/";

        reportStream = diretorioProjeto + nomeArquivoRelatorioJasper;

        params.put("diretorioProjeto", reportStream);
        params.put("diretorio", diretorioProjeto);

        ServletOutputStream out = response.getOutputStream();

        JasperPrint jp = JasperFillManager.fillReport(reportStream, params, connection);

        JRPdfExporter exporter = new JRPdfExporter();

        exporter.setParameter(JRExporterParameter.JASPER_PRINT, jp);
        exporter.setParameter(JRExporterParameter.OUTPUT_STREAM, out);

        exporter.exportReport();
	}
    
    public InstituicaoEnsinoRepository getInstituicaoEnsinoRepository() {
        return this.instituicaoEnsinoRepository;
    }
    
    
}
