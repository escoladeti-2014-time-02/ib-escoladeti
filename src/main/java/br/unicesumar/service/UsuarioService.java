package br.unicesumar.service;

import static br.unicesumar.datapage.DataPage.pageRequestForAsc;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import br.unicesumar.datapage.DataPage;
import br.unicesumar.entity.Usuario;
import br.unicesumar.repository.UsuarioRepository;

@Service
public class UsuarioService {

	@Autowired
	private UsuarioRepository usuarioRepository;

	@Autowired
	private PerfilDeAcessoService perfilAcessoService;

	public Usuario salvar(Usuario usuario) {
		return getUsuarioRepository().save(usuario);
	}
	    
	public Usuario alterar(Usuario usuario) {
	    return getUsuarioRepository().saveAndFlush(usuario);
	}

	public DataPage<Usuario> listar(Integer page, String argumentoBusca) {
	    return new DataPage<>(getUsuarioRepository().findByLoginContainingIgnoreCase(argumentoBusca, pageRequestForAsc(page, "login")));
	}

	public void apagar(Usuario usuario) {
		getUsuarioRepository().delete(usuario);
	}

	public Usuario findById(Long id) {
		return getUsuarioRepository().findById(id);
	}

	public List<Usuario> listar() {
	  	return getUsuarioRepository().findAll(new Sort(new Sort.Order(Sort.Direction.ASC, "login")));
	}

	/*
	 * 
		GETTERS E SETTERS
	*/    
	public UsuarioRepository getUsuarioRepository() {
	    return this.usuarioRepository;
	}

	public PerfilDeAcessoService getPerfilAcessoService() {
		return this.perfilAcessoService;
	}
}
