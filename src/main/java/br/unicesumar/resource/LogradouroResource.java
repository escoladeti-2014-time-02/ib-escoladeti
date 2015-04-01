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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import br.unicesumar.datapage.DataPage;
import br.unicesumar.entity.Logradouro;
import br.unicesumar.entity.TipoLogradouro;
import br.unicesumar.service.LogradouroService;

@Controller
@RequestMapping(value = "/rest/logradouro")
public class LogradouroResource {
    
    @Autowired
    private LogradouroService service;
   
    @RequestMapping(method = POST)
    public @ResponseBody Logradouro salvar(@RequestBody Logradouro entidade) {
        return getLogradouroService().salvar(entidade);
    }

    @RequestMapping(value = "/{id}", method = PUT)
    public @ResponseBody Logradouro atualizar(@RequestBody Logradouro entidade) {
        return getLogradouroService().alterar(entidade);
    }

    @RequestMapping(value = "/{id}", method = DELETE)
    public @ResponseBody void apagar(@RequestBody Logradouro entidade) {
        getLogradouroService().apagar(entidade);
    }

    @RequestMapping(method = GET)
    public @ResponseBody List<Logradouro> listar() {
        return getLogradouroService().listar();
    }

    @RequestMapping(value = "/pagina/{numeroPagina}", method = GET)
    public @ResponseBody DataPage<Logradouro> listar(@PathVariable Integer numeroPagina, @RequestParam(value = "busca", required = false, defaultValue = "") String busca) {
    	return getLogradouroService().listar(numeroPagina, busca);
    }

    @RequestMapping(value = "/{id}",method = GET)
    public @ResponseBody Logradouro buscar(@PathVariable Long id) {
        return getLogradouroService().findById(id);
    }
    
    @RequestMapping(value = "/listarTiposLogradouro", method = GET)
    public @ResponseBody List<TipoLogradouro> listarTiposLogradouro() {
    	return getLogradouroService().listarTiposLogradouro();
    }
    
    @RequestMapping(value = "/listarPorBairro/{idBairro}", method = GET)
    public @ResponseBody List<Logradouro> listarTiposLogradouro(@PathVariable Long idBairro) {
    	return getLogradouroService().listarPorBairro(idBairro);
    }

    /*
     * GETTERS E SETTERS
     */
    public LogradouroService getLogradouroService() {
        return this.service;
    }
}