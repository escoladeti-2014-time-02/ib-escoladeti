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
import org.springframework.transaction.annotation.Transactional;

import br.unicesumar.datapage.DataPage;
import br.unicesumar.entity.Colaborador;
import br.unicesumar.exception.CrudResourceException;
import br.unicesumar.repository.ColaboradorRepository;
import br.unicesumar.repository.CrudRepository;

/**
 *
 * @author Matcher
 */
@Service
public class ColaboradorService {

	@Autowired
	private ColaboradorRepository colaboradorRepository;

	private static final String nomeArquivoRelatorioJasper = "listagemColaborador.jasper";
	
	@Autowired
	private PessoaFisicaService servicePessoaFisica;

	@Transactional
	public Colaborador salvar(Colaborador colaborador) {
		checkPessoaFisica(colaborador);
		return getRepo().save(colaborador);
	}

	@Transactional
	public Colaborador atualizar(Colaborador colaborador) {
		checkPessoaFisica(colaborador);
		return getRepo().saveAndFlush(colaborador);
	}

	@Transactional
	public void excluir(Colaborador entidade) {
		getRepo().delete(entidade);
	}
	
	@Transactional
	public Colaborador buscar(Long id) {
		return getRepo().findOne(id);
	}

	@Transactional
	public List<Colaborador> listarTodas() throws CrudResourceException {
		return getRepo().findAll();
	}

	private void checkPessoaFisica(Colaborador colaborador) {
		if(colaborador.getPessoaFisica().isNew()) {
			colaborador.setPessoaFisica(servicePessoaFisica.salvar(colaborador.getPessoaFisica()));
		}
	}
	
	public DataPage<Colaborador> listar(Integer page, String argumentoBusca) {
		return new DataPage<>(
				colaboradorRepository
				.findByPessoaFisicaNomeContainingIgnoreCase(
				argumentoBusca,
				pageRequestForAsc(page, "pessoaFisica.nome")));
	}
	
	public void imprimirRelatorio(HttpServletResponse response, Connection connection) throws IOException, JRException, SQLException {
		response.setHeader("Content-Disposition", "inline; filename=listagemColaborador.pdf");
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
	
	public CrudRepository<Colaborador> getRepo() {
		return this.colaboradorRepository;
	}
}
