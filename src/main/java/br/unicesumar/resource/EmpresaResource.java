package br.unicesumar.resource;
/**
*
* @author Matcher
*/
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
import br.unicesumar.entity.Empresa;
import br.unicesumar.service.EmpresaService;

@Controller
@RequestMapping("/rest/empresa")
public class EmpresaResource implements CrudResource<Empresa>{

	@Autowired
	private EmpresaService empresaService;
	
	@Autowired
	private DataSource dataSource;

	@RequestMapping(method = POST)
	public @ResponseBody Empresa salvar(@RequestBody Empresa entidade){
		return getService().salvar(entidade);
	}
	
	@RequestMapping(value = "/{id}", method = PUT)
	public @ResponseBody Empresa atualizar(@RequestBody Empresa pessoaJuridica){
		return getService().alterar(pessoaJuridica);
	}
	
	@RequestMapping(value = "/pagina/{numeroPagina}", method = GET)
	public @ResponseBody DataPage<Empresa> listar(@PathVariable Integer numeroPagina){
		return getService().listar(numeroPagina);
	}
	
	@RequestMapping(method = GET)
	public @ResponseBody List<Empresa> listar(){
		return getService().listar();
	}
	
	@RequestMapping(value = "/{id}", method = GET)
	public @ResponseBody Empresa buscar(@PathVariable Long id){
		return getService().findById(id);
	}
	
	@RequestMapping(value = "/{id}", method = DELETE)
	public @ResponseBody void apagar(@RequestBody Empresa pessoaJuridica){
		getService().apagar(pessoaJuridica);
	}
	
    @RequestMapping(value = "/listarEmpresas", method = GET)
    public @ResponseBody List<Empresa> listarSomenteEmpresas() {
    	return getService().listarSomenteEmpresas();
    }
    
    @RequestMapping(value = "imprimirRelatorio", method = RequestMethod.GET)
	public void imprimirRelatorio(HttpServletResponse response) throws IOException, JRException, SQLException {
		empresaService.imprimirRelatorio(response, dataSource.getConnection());
	}

	/*
	 * GETTES E SETTERS
	 */
	public EmpresaService getService() {
		return this.empresaService;
	}
}
