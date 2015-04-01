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
import br.unicesumar.entity.Bairro;
import br.unicesumar.service.BairroService;

@Controller
@RequestMapping("/rest/bairro")
public class BairroResource implements CrudResource<Bairro>{

    @Autowired
    private BairroService service;

    @RequestMapping(method = POST)
    public @ResponseBody Bairro salvar(@RequestBody Bairro entidade) {
        return getService().salvar(entidade);
    }

    @RequestMapping(value = "/{id}", method = PUT)
    public @ResponseBody Bairro atualizar(@RequestBody Bairro bairro) {
        return getService().alterar(bairro);
    }

    @RequestMapping(method = GET)
    public @ResponseBody List<Bairro> listar() {
        return getService().listar();
    }

	@RequestMapping(value = "/pagina/{numeroPagina}", method = GET)
	public @ResponseBody DataPage<Bairro> listar(
			@PathVariable Integer numeroPagina,
			@RequestParam(value = "busca", required = false, defaultValue = "") String busca) {
		return getService().listar(numeroPagina, busca);
	}
    
    @RequestMapping(value = "/listarPorCidade/{id}")
    public @ResponseBody List<Bairro> listarPorCidade(@PathVariable Long id) {
    	return getService().listarPorCidade(id);
    }

    @RequestMapping(value = "/{id}", method = DELETE)
    public @ResponseBody void apagar(@RequestBody Bairro bairro) {
        getService().apagar(bairro);
    }	

    @RequestMapping(value = "/{id}", method = GET)
    public @ResponseBody Bairro buscar(@PathVariable Long id) {
        return getService().findById(id);
    }

    /*
     * GETTERS E SETTERS
     */
    private BairroService getService() {
        return this.service;
    }

}