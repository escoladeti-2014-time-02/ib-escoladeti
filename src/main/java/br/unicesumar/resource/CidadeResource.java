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
import br.unicesumar.entity.Cidade;
import br.unicesumar.service.CidadeService;

@Controller
@RequestMapping("/rest/cidade")
public class CidadeResource implements CrudResource<Cidade> {

    @Autowired
    private CidadeService service;

    @RequestMapping(method = POST)
    public @ResponseBody Cidade salvar(@RequestBody Cidade entidade) {
        return getService().salvar(entidade);
    }

    @RequestMapping(value = "/{id}", method = PUT)
    public @ResponseBody Cidade atualizar(@RequestBody Cidade cidade) {
        return getService().alterar(cidade);
    }

    @RequestMapping(method = GET)
    public @ResponseBody List<Cidade> listar() {
        return getService().listar();
    }

    @RequestMapping(value = "/pagina/{numeroPagina}", method = GET)
    public @ResponseBody DataPage<Cidade> listar(@PathVariable Integer numeroPagina, @RequestParam(value = "busca", required = false, defaultValue = "") String busca) {
    	return getService().listar(numeroPagina, busca);
    }	

    @RequestMapping(value = "/listarPorUf/{idUf}", method = GET)
    public @ResponseBody List<Cidade> listarPorUf(@PathVariable Long idUf) {
    	return getService().listarPorIdUf(idUf);
    }
    
    @RequestMapping(value = "/listarCidades", method = GET)
    public @ResponseBody List<Cidade> listarPorUf() {
    	return getService().listarCidades();
    }

    @RequestMapping(value = "/{id}", method = DELETE)
    public @ResponseBody void apagar(@RequestBody Cidade cidade) {
        getService().apagar(cidade);
    }

    @RequestMapping(value = "/{id}", method = GET)
    public @ResponseBody Cidade buscar(@PathVariable Long id) {
        return getService().findById(id);
    }

    /* 
    GETTERS E SETTER
    */
    public CidadeService getService() {
        return this.service;
    }
}
