package br.unicesumar.service;

import static br.unicesumar.datapage.DataPage.pageRequestForAsc;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import br.unicesumar.datapage.DataPage;
import br.unicesumar.entity.UsuarioPerfilAcesso;
import br.unicesumar.repository.UsuarioPerfilAcessoRepository;

@Service
public class UsuarioPerfilAcessoService {
	
	@Autowired
	private UsuarioPerfilAcessoRepository usuarioPerfilAcessoRepository;
	
	@Autowired
    private UsuarioService usuarioService;

    public UsuarioPerfilAcesso salvar(UsuarioPerfilAcesso usuarioPerfilAcesso) {
        return getUsuarioPerfilAcessoRepository().save(usuarioPerfilAcesso);
    }

    public List<UsuarioPerfilAcesso> listar() {
        return getUsuarioPerfilAcessoRepository().findAll(new Sort(new Sort.Order(Sort.Direction.ASC, "nome")));
    }

    public void apagar(UsuarioPerfilAcesso usuarioPerfilAcesso) {
        getUsuarioPerfilAcessoRepository().delete(usuarioPerfilAcesso);
    }

    public UsuarioPerfilAcesso findById(Long id) {
        return getUsuarioPerfilAcessoRepository().findById(id);
    }

    public UsuarioPerfilAcesso alterar(UsuarioPerfilAcesso usuarioPerfilAcesso){
        return getUsuarioPerfilAcessoRepository().saveAndFlush(usuarioPerfilAcesso);
    }


    public DataPage<UsuarioPerfilAcesso> listar(Integer numeroPagina) {
    	return new DataPage<>(getUsuarioPerfilAcessoRepository().findAll(pageRequestForAsc(numeroPagina, "nome")));
    }

    /*
     * GETTERS E SETTERS 
     */

    public UsuarioPerfilAcessoRepository getUsuarioPerfilAcessoRepository() {
        return this.usuarioPerfilAcessoRepository;
    }

	public UsuarioService getUsuarioService() {
		return usuarioService;
	}
} 
