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
import br.unicesumar.entity.UsuarioPerfilAcesso;
import br.unicesumar.service.UsuarioPerfilAcessoService;

@Controller
@RequestMapping(value = "/rest/usuarioperfilacesso")
public class UsuarioPerfilAcessoResource implements CrudResource<UsuarioPerfilAcesso> {
	
	@Autowired
	private UsuarioPerfilAcessoService service;
	
	@RequestMapping(method = POST)
	public @ResponseBody UsuarioPerfilAcesso salvar(@RequestBody UsuarioPerfilAcesso entidade){
		return getUsuarioPerfilAcessoService().salvar(entidade);
	}
	
	@RequestMapping(value = "/{id}", method = PUT)
	public @ResponseBody UsuarioPerfilAcesso atualizar(@RequestBody UsuarioPerfilAcesso entidade) {
        return getUsuarioPerfilAcessoService().alterar(entidade);
    }
	
	@RequestMapping(value = "/{id}", method = DELETE)
    public @ResponseBody void apagar(@RequestBody UsuarioPerfilAcesso entidade) {
		getUsuarioPerfilAcessoService().apagar(entidade);
    }
    
    @RequestMapping(method = GET)
    public @ResponseBody List<UsuarioPerfilAcesso> listar() {
        return getUsuarioPerfilAcessoService().listar();
    }

    @RequestMapping(value = "/pagina/{numeroPagina}", method = GET)
    public @ResponseBody DataPage<UsuarioPerfilAcesso> listar(@PathVariable Integer numeroPagina) {
    	return getUsuarioPerfilAcessoService().listar(numeroPagina);
    }

    @RequestMapping(value = "/{id}",method = GET)
    public @ResponseBody UsuarioPerfilAcesso buscar(@PathVariable Long id) {
        return getUsuarioPerfilAcessoService().findById(id);
    }

    
    public UsuarioPerfilAcessoService getUsuarioPerfilAcessoService(){
        return this.service;
    }

}
