package br.unicesumar.resource;

import java.util.List;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import br.unicesumar.exception.CrudResourceException;
import br.unicesumar.service.ICrudService;

public abstract class CrudResourceTemplate<T> implements ICrudResource<T> {

	@RequestMapping(method = RequestMethod.POST)
	public @ResponseBody
	T salvar(@RequestBody T entidade) throws CrudResourceException {
		return getService().salvar(entidade);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.PUT)
	public @ResponseBody 
	T atualizar(@RequestBody T entidade) throws CrudResourceException {
		return getService().atualizar(entidade);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	public @ResponseBody
	void excluir(@RequestBody T entidade) throws CrudResourceException {
		getService().excluir(entidade);
	}

	@RequestMapping(method = RequestMethod.GET)
	public @ResponseBody
	List<T> listarTodas() throws CrudResourceException {
		return getService().listarTodas();
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public @ResponseBody
	T buscar(@PathVariable("id") Long id) throws CrudResourceException {
		return getService().buscar(id);
	}

	/*
	 * GETTERS E SETTERS
	 */
	
	public abstract ICrudService<T> getService() throws CrudResourceException;
}