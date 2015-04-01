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
import br.unicesumar.entity.TipoTelefone;
import br.unicesumar.service.TipoTelefoneService;

/**
 *
 * @author heidi
 */
@Controller
@RequestMapping("/rest/tipotelefone")
public class TipoTelefoneResource implements CrudResource<TipoTelefone> {
    @Autowired
    private TipoTelefoneService service;

    @RequestMapping(method = POST)
    public @ResponseBody TipoTelefone salvar(@RequestBody TipoTelefone entidade) {
        return getService().salvar(entidade);
    }

    @RequestMapping(method = PUT)
    public @ResponseBody TipoTelefone atualizar(@RequestBody TipoTelefone tipoTelefone) {
        return getService().alterar(tipoTelefone);
    }

    @RequestMapping(method = GET)
    public @ResponseBody List<TipoTelefone> listar() {
        return getService().listar();
    }

    @RequestMapping(value = "/pagina/{numeroPagina}", method = GET)
    public @ResponseBody DataPage<TipoTelefone> listar(
                    @PathVariable Integer numeroPagina,
                    @RequestParam(value = "busca", required = false, defaultValue = "") String busca) {
            return getService().listar(numeroPagina, busca);
    }

    @RequestMapping(method = DELETE)
    public @ResponseBody void apagar(@RequestBody TipoTelefone tipoTelefone) {
        getService().apagar(tipoTelefone);
    }	

    @RequestMapping(value = "/{id}", method = GET)
    public @ResponseBody TipoTelefone buscar(@PathVariable Long id) {
        return getService().findById(id);
    }

    public TipoTelefoneService getService() {
        return service;
    }
}
