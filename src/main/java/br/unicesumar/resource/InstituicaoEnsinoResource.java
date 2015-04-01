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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import br.unicesumar.datapage.DataPage;
import br.unicesumar.entity.InstituicaoEnsino;
import br.unicesumar.service.InstituicaoEnsinoService;
/**
 *
 * @author Matcher
 */
@Controller
@RequestMapping(value = "/rest/instituicaoEnsino")
public class InstituicaoEnsinoResource {
    
	@Autowired
    private InstituicaoEnsinoService service;
	
	@Autowired
	private DataSource dataSource;
   
    @RequestMapping(method = POST)
    public @ResponseBody InstituicaoEnsino salvar(@RequestBody InstituicaoEnsino entidade) {
        return getInstituicaoEnsinoService().salvar(entidade);
    }
    
    @RequestMapping(value = "/{id}", method = PUT)
    public @ResponseBody InstituicaoEnsino atualizar(@RequestBody InstituicaoEnsino entidade) {
        return getInstituicaoEnsinoService().alterar(entidade);
    }
    
    @RequestMapping(value = "/{id}", method = DELETE)
    public @ResponseBody String apagar(@RequestBody InstituicaoEnsino entidade) {
        return getInstituicaoEnsinoService().apagar(entidade);
    }
    
    @RequestMapping(method = GET)
    public @ResponseBody List<InstituicaoEnsino> listar() {
        return getInstituicaoEnsinoService().listar();
    }
    
    @RequestMapping(value = "/pagina/{numeroPagina}", method = GET)
    public @ResponseBody DataPage<InstituicaoEnsino> listar(@PathVariable Integer numeroPagina, @RequestParam(value = "busca", required = false, defaultValue = "") String busca) {
    	return getInstituicaoEnsinoService().listar(numeroPagina, busca);
    }	
    
    @RequestMapping(value = "/{id}",method = GET)
    public @ResponseBody InstituicaoEnsino buscar(@PathVariable Long id) {
        return getInstituicaoEnsinoService().findById(id);
    }
    
    @RequestMapping(value = "imprimirRelatorio", method = RequestMethod.GET)
	public void imprimirRelatorio(HttpServletResponse response) throws IOException, JRException, SQLException {
		service.imprimirRelatorio(response, dataSource.getConnection());
	}
    
    public InstituicaoEnsinoService getInstituicaoEnsinoService(){
        return this.service;
    }
}