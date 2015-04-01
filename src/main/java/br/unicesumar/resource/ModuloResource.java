package br.unicesumar.resource;

import static org.springframework.web.bind.annotation.RequestMethod.DELETE;
import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;
import static org.springframework.web.bind.annotation.RequestMethod.PUT;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;

import javax.servlet.http.HttpServletResponse;
import javax.sql.DataSource;

import net.sf.jasperreports.engine.JRException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import br.unicesumar.datapage.DataPage;
import br.unicesumar.entity.Modulo;
import br.unicesumar.service.ModuloService;

/**
 * @author heidi 
 */

@Controller
@RequestMapping("/rest/modulo")
public class ModuloResource implements CrudResource<Modulo> {

	@Autowired
	private ModuloService moduloService;
	
	@Autowired
	private DataSource dataSource;

	@RequestMapping(method = POST)
	public @ResponseBody Modulo salvar(@RequestBody Modulo modulo){
		return getService().salvar(modulo);
	}

	@RequestMapping(value = "/{id}", method = PUT)
	public @ResponseBody Modulo atualizar(@RequestBody Modulo pessoaJuridica){
		return getService().alterar(pessoaJuridica);
	}

	@RequestMapping(value = "/pagina/{numeroPagina}", method = GET)
	public @ResponseBody DataPage<Modulo> listar(@PathVariable Integer numeroPagina) {
		return getService().listar(numeroPagina);
	}

	@RequestMapping(method = GET)
	public @ResponseBody List<Modulo> listar() {
		return getService().listar();
	}
	
	@RequestMapping(value = "/{id}", method = GET)
	public @ResponseBody Modulo buscar(@PathVariable Long id){
		return getService().findById(id);
	}
	
	@RequestMapping(value = "/{id}", method = DELETE)
	public @ResponseBody void apagar(@RequestBody Modulo pessoaJuridica){
		getService().apagar(pessoaJuridica);
	}
	
	 @RequestMapping(value = "imprimirRelatorio", method = RequestMethod.GET)
		public void imprimirRelatorio(HttpServletResponse response) throws IOException, JRException, SQLException {
		  moduloService.imprimirRelatorio(response, dataSource.getConnection());
		}

	 @RequestMapping(value = "imprimirRelatorioFaltasModulo/{moduloid}", method = RequestMethod.GET)
		public void imprimirRelatorioFaltasModulo(
			@PathVariable Integer moduloid, HttpServletResponse response) throws IOException, JRException, SQLException {
		    moduloService.imprimirRelatorioFaltasModulo(moduloid, response, dataSource.getConnection());
		}
	 
	/*
	 * GETTES E SETTERS
	 */
	public ModuloService getService() {
		return this.moduloService;
	}
}