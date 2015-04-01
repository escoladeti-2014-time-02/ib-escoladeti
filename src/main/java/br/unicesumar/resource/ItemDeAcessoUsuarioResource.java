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
import br.unicesumar.entity.ItemDeAcessoUsuario;
import br.unicesumar.service.ItemDeAcessoUsuarioService;


@Controller
@RequestMapping("/rest/itemdeacessousuario")
public class ItemDeAcessoUsuarioResource {

    @Autowired
    private ItemDeAcessoUsuarioService service;

    @RequestMapping(method = POST)
    public @ResponseBody ItemDeAcessoUsuario salvar(@RequestBody ItemDeAcessoUsuario entidade) {
        return getService().salvar(entidade);
    }

    @RequestMapping(value = "/{id}", method = PUT)
    public @ResponseBody ItemDeAcessoUsuario atualizar(@RequestBody ItemDeAcessoUsuario itemDeAcessoUsuario) {
    	return getService().alterar(itemDeAcessoUsuario);
    }

    @RequestMapping(value = "/pagina/{numeroPagina}", method = GET)
    public @ResponseBody DataPage<ItemDeAcessoUsuario> listar(@PathVariable Integer numeroPagina) {
    	return getService().listar(numeroPagina);
    }

    @RequestMapping(method = GET)
    public @ResponseBody List<ItemDeAcessoUsuario> listar() {
    	return getService().listar();
    }

    @RequestMapping(value = "/{id}", method = GET)
    public @ResponseBody ItemDeAcessoUsuario buscar(@PathVariable Long id) {
    	return getService().findById(id);
    }

    @RequestMapping(value = "/{id}", method = DELETE)
    public @ResponseBody void apagar(@RequestBody ItemDeAcessoUsuario itemDeAcessoUsuario) {
    	getService().apagar(itemDeAcessoUsuario);
    }

    /*
    GETTERS E SETTERS
    */
    public ItemDeAcessoUsuarioService getService() {
        return this.service;
    }
}
