package br.unicesumar.service;

import static br.unicesumar.datapage.DataPage.pageRequestForAsc;

import java.io.IOException;
import java.io.OutputStream;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.Date;
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
import br.unicesumar.entity.Contrato;
import br.unicesumar.entity.TipoEvento;
import br.unicesumar.exception.CandidatoException;
import br.unicesumar.exception.CrudResourceException;
import br.unicesumar.repository.ContratoRepository;
import br.unicesumar.util.date.DateUtils;

@Service
public class ContratoService extends CrudServiceTemplate<Contrato> {
	
	@Autowired
	private ContratoRepository contratoRepository;
	
	@Autowired
	private EventoService eventoService;
	
	public DataPage<Contrato> listarPaginado(Integer numeroPagina,
			String argumentoBusca) throws CrudResourceException {
		return new DataPage<Contrato>(getRepo().findAll(pageRequestForAsc(numeroPagina, "id")));
	}
	
	public DataPage<Contrato> filtrarPorData(Integer numeroPagina,
			String argumentoBusca, Date dataInicio, Date dataTermino) throws CrudResourceException {
		return new DataPage<Contrato>(getRepo().filtrarPorData(dataInicio, dataTermino, (pageRequestForAsc(numeroPagina, "id"))));
	}

	public Contrato filtrarPorAluno(Long idAluno) {
		return contratoRepository.filtrarPorAluno(idAluno);
	}
	
	/*
	 * GETTERS E SETTERS
	 */
	public ContratoRepository getRepo() {
		return contratoRepository;
	}

	public void imprimirContrato(Long idContrato,
			HttpServletResponse response, Connection connection) throws IOException, JRException, SQLException {
		response.setHeader("Content-Disposition", "inline; filename=Contrato-" + idContrato.toString() +".pdf");
        HashMap<String, Object> params = new HashMap<>();
        
        params.put("idContrato", idContrato);

        String reportStream = ModuloService.class.getProtectionDomain().getCodeSource().getLocation().getPath();
        String diretorioProjeto = reportStream.substring(1, reportStream.indexOf("springrest")) ;
        diretorioProjeto = diretorioProjeto + "springrest/resources/relatorios/";

        reportStream = diretorioProjeto + "contrato.jasper";

        params.put("diretorioProjeto", reportStream);
        params.put("diretorio", diretorioProjeto);

        OutputStream out = response.getOutputStream();

        JasperPrint jp = JasperFillManager.fillReport(reportStream, params, connection);

        JRPdfExporter exporter = new JRPdfExporter();

        exporter.setParameter(JRExporterParameter.JASPER_PRINT, jp);
        exporter.setParameter(JRExporterParameter.OUTPUT_STREAM, out);

        exporter.exportReport();
	}

	public void imprimirContratoPorDataTermino(HttpServletResponse response, Connection connection) throws IOException, JRException, SQLException {
		response.setHeader("Content-Disposition", "inline; filename=Contrato_por_data_desligamento.pdf");
        HashMap<String, Object> params = new HashMap<>();
        
        String reportStream = ModuloService.class.getProtectionDomain().getCodeSource().getLocation().getPath();
        String diretorioProjeto = reportStream.substring(1, reportStream.indexOf("springrest")) ;
        diretorioProjeto = diretorioProjeto + "springrest/resources/relatorios/";

        reportStream = diretorioProjeto + "contratoPorDataDesligamento.jasper";

        params.put("diretorioProjeto", reportStream);
        params.put("diretorio", diretorioProjeto);

        OutputStream out = response.getOutputStream();

        JasperPrint jp = JasperFillManager.fillReport(reportStream, params, connection);

        JRPdfExporter exporter = new JRPdfExporter();

        exporter.setParameter(JRExporterParameter.JASPER_PRINT, jp);
        exporter.setParameter(JRExporterParameter.OUTPUT_STREAM, out);

        exporter.exportReport();
	}
	
	@Override
	public Contrato salvar(Contrato contrato){
		Contrato retorno = getRepo().save(contrato);
		try {
			gerarEventoContrato(retorno);
		} catch (CandidatoException e) {
			e.printStackTrace();
		} catch (CrudResourceException e) {
			e.printStackTrace();
		}
		return retorno; 
	}

	private void gerarEventoContrato(Contrato retorno) throws CandidatoException,
	CrudResourceException {
		TipoEvento tipo = new TipoEvento();
		tipo.setId(1L);
		getEventoService().adicionarEventoCandidato(retorno.getAluno().getCandidato().getId(),
				"Inicio do contrato!", 
				"Contrato iniciado em: "+DateUtils.formatar(retorno.getDataInicio()),
				tipo);
		
		TipoEvento tipoFimContrato = new TipoEvento();
		tipoFimContrato.setId(9L);
		getEventoService().adicionarEventoCandidatoFimContrato(retorno.getAluno().getCandidato().getId(), 
				"Data de encerramento do contrato", 
				"Data de encerramento do contrato: "+DateUtils.formatar(retorno.getDataTermino()), 
				tipoFimContrato, 
				retorno.getDataTermino());
	}

	public EventoService getEventoService() {
		return eventoService;
	}

	public void setEventoService(EventoService eventoService) {
		this.eventoService = eventoService;
	}
	


}
