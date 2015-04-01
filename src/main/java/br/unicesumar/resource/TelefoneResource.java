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
import br.unicesumar.entity.Telefone;
import br.unicesumar.service.TelefoneService;

/**
 *
 * @author heidi
 */

@Controller
@RequestMapping("/rest/telefone")
public class TelefoneResource implements CrudResource<Telefone>{
    @Autowired
    private TelefoneService service;

    @RequestMapping(method = POST)
    public @ResponseBody Telefone salvar(@RequestBody Telefone entidade) {
        return getService().salvar(entidade);
    }

    @RequestMapping(method = PUT)
    public @ResponseBody Telefone atualizar(@RequestBody Telefone telefone) {
        return getService().alterar(telefone);
    }

    @RequestMapping(method = GET)
    public @ResponseBody List<Telefone> listar() {
        return getService().listar();
    }

    @RequestMapping(value = "/pagina/{numeroPagina}", method = GET)
    public @ResponseBody DataPage<Telefone> listar(
                    @PathVariable Integer numeroPagina,
                    @RequestParam(value = "busca", required = false, defaultValue = "") String busca) {
            return getService().listar(numeroPagina, busca);
    }

    @RequestMapping(method = DELETE)
    public @ResponseBody void apagar(@RequestBody Telefone telefone) {
        getService().apagar(telefone);
    }	

    @RequestMapping(value = "/{id}", method = GET)
    public @ResponseBody Telefone buscar(@PathVariable Long id) {
        return getService().findById(id);
    }

    public TelefoneService getService() {
        return service;
    }
    
}
