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
import br.unicesumar.entity.ItemDeAcesso;
import br.unicesumar.service.ItemDeAcessoService;


@Controller
@RequestMapping("/rest/itemdeacesso")
public class ItemDeAcessoResource implements CrudResource<ItemDeAcesso>{

	@Autowired
    private ItemDeAcessoService service;

    @RequestMapping(method = POST)
    public @ResponseBody ItemDeAcesso salvar(@RequestBody ItemDeAcesso entidade) {
        return getService().salvar(entidade);
    }

    @RequestMapping(value = "/{id}", method = PUT)
    public @ResponseBody ItemDeAcesso atualizar(@RequestBody ItemDeAcesso itemDeAcesso) {
    	return getService().alterar(itemDeAcesso);
    }

    @RequestMapping(value = "/pagina/{numeroPagina}", method = GET)
    public @ResponseBody DataPage<ItemDeAcesso> listar(@PathVariable Integer numeroPagina) {
    	return getService().listar(numeroPagina);
    }

    @RequestMapping(method = GET)
    public @ResponseBody List<ItemDeAcesso> listar() {
    	return getService().listar();
    }

    @RequestMapping(value = "/{id}", method = GET)
    public @ResponseBody ItemDeAcesso buscar(@PathVariable Long id) {
    	return getService().findById(id);
    }

    @RequestMapping(value = "/{id}", method = DELETE)
    public @ResponseBody void apagar(@RequestBody ItemDeAcesso itemDeAcesso) {
    	getService().apagar(itemDeAcesso);
    }

    /*
    GETTERS E SETTERS
    */
    public ItemDeAcessoService getService() {
        return this.service;
    }
}
