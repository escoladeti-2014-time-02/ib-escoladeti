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
import br.unicesumar.entity.Usuario;
import br.unicesumar.service.UsuarioService;

@Controller
@RequestMapping("/rest/usuario")
public class UsuarioResource implements CrudResource<Usuario> {

	@Autowired
    private UsuarioService service;

    @RequestMapping(method = POST)
    public @ResponseBody Usuario salvar(@RequestBody Usuario entidade) {
        return getService().salvar(entidade);
    }

    @RequestMapping(value = "/{id}", method = PUT)
    public @ResponseBody Usuario atualizar(@RequestBody Usuario usuario) {
    	return getService().alterar(usuario);
    }

    @RequestMapping(value = "/pagina/{numeroPagina}", method = GET)
    public @ResponseBody DataPage<Usuario> listar(@PathVariable Integer numeroPagina, @RequestParam(value = "busca", required = false, defaultValue = "") String busca) {
    	return getService().listar(numeroPagina, busca);
    }

    @RequestMapping(method = GET)
    public @ResponseBody List<Usuario> listar() {
    	return getService().listar();
    }

    @RequestMapping(value = "/{id}", method = GET)
    public @ResponseBody Usuario buscar(@PathVariable Long id) {
    	return getService().findById(id);
    }

    @RequestMapping(value = "/{id}", method = DELETE)
    public @ResponseBody void apagar(@RequestBody Usuario usuario) {
    	getService().apagar(usuario);
    }

    /*
    GETTERS E SETTERS
    */
    public UsuarioService getService() {
        return this.service;
    }
}