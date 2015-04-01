package br.unicesumar.service;

/**
*
* @author Matcher
*/
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
import br.unicesumar.entity.Empresa;
import br.unicesumar.entity.EmpresaProcessoSeletivo;
import br.unicesumar.repository.EmpresaRepository;

@Service
public class EmpresaService extends CrudServiceTemplate<Empresa> {

	@Autowired
    private EmpresaRepository empresaRepository;
	
	private static final String nomeArquivoRelatorioJasper = "listagemEmpresa.jasper";

	public Empresa salvar(Empresa empresa){
		return getRepo().save(empresa);
	}
	
	public Empresa alterar(Empresa pessoaJuridica){
		return getRepo().saveAndFlush(pessoaJuridica);
	}
	
	public DataPage<Empresa> listar(Integer page){
		return new DataPage<>(getRepo().findAll(pageRequestForAsc(page, "nome")));
	}
	
	public void apagar(Empresa pessoaJuridica){
		getRepo().delete(pessoaJuridica);
	}
	
	public Empresa findById(Long id){
		return getRepo().findById(id);
	}
	
	public List<Empresa> listar(){
		return getRepo().findAll(new Sort(new Sort.Order(Sort.Direction.ASC, "nome")));
	}
	
    public List<Empresa> listarSomenteEmpresas() {
    	return getRepo().buscarTodoasEmpresas();
    }

	public List<EmpresaProcessoSeletivo> listarEmpresasNaoParticipantesDoProcesso(Long idProcesso) {
		return getRepo().findEmpresasNaoParticipantesProcesso(idProcesso);
	}

	public List<EmpresaProcessoSeletivo> listarEmpresasDoProcesso(Long idProcesso) {
		return getRepo().findEmpresasDoProcesso(idProcesso);
	}
	
	public void imprimirRelatorio(HttpServletResponse response, Connection connection) throws IOException, JRException, SQLException {
		response.setHeader("Content-Disposition", "inline; filename=listagemEmpresa.pdf");
        HashMap<String, Object> params = new HashMap<>();

        String reportStream = PessoaJuridicaService.class.getProtectionDomain().getCodeSource().getLocation().getPath();
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

	/*
	 * GETTERS E SETTERS 
	 */
	@Override
	public EmpresaRepository getRepo() {
		return empresaRepository;
	}
}
