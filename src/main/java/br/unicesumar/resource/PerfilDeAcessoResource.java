package br.unicesumar.resource;

import static org.springframework.web.bind.annotation.RequestMethod.DELETE;
import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;
import static org.springframework.web.bind.annotation.RequestMethod.PUT;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import br.unicesumar.datapage.DataPage;
import br.unicesumar.entity.PerfilDeAcesso;
import br.unicesumar.service.PerfilDeAcessoService;

/**
 * @author Matcher
 */

@Controller
@RequestMapping("/rest/perfildeacesso")
public class PerfilDeAcessoResource implements CrudResource<PerfilDeAcesso>{
    
    @Autowired
    private PerfilDeAcessoService service;

    @RequestMapping(method = POST)
    public @ResponseBody PerfilDeAcesso salvar(@RequestBody PerfilDeAcesso entidade) {
        return getService().salvar(entidade);
    }

    @RequestMapping(value = "/{id}", method = PUT)
    public @ResponseBody PerfilDeAcesso atualizar(@RequestBody PerfilDeAcesso entidade) {
        return getService().alterar(entidade);
    }

    @RequestMapping(value = "/pagina/{numeroPagina}", method = GET)
    public @ResponseBody DataPage<PerfilDeAcesso> listar(@PathVariable Integer numeroPagina) {
    	return getService().listar(numeroPagina);
    }
    
    @RequestMapping(method = GET)
    public @ResponseBody List<PerfilDeAcesso> listar() {
        return getService().listar();
    }
    
    @RequestMapping(value = "/{id}", method = GET)
    public @ResponseBody PerfilDeAcesso buscar(@PathVariable Long id) {
        return getService().findById(id);
    }
    
    @RequestMapping(value = "/{id}", method = DELETE)
    public @ResponseBody void apagar(@RequestBody PerfilDeAcesso entidade) {
        getService().apagar(entidade);
    }

    private PerfilDeAcessoService getService() {
        return this.service;
    }    
}
