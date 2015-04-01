package br.unicesumar.service;

import java.util.List;

import br.unicesumar.exception.CrudResourceException;
import br.unicesumar.repository.CrudRepository;

public abstract class CrudServiceTemplate<T> implements ICrudService<T> {

	@Override
	public T salvar(T entidade) throws CrudResourceException {
		return getRepo().save(entidade);
	}

	@Override
	public T atualizar(T entidade) throws CrudResourceException {
		return getRepo().saveAndFlush(entidade);
	}

	@Override
	public void excluir(T entidade) throws CrudResourceException {
		getRepo().delete(entidade);
	}

	@Override
	public List<T> listarTodas() throws CrudResourceException {
		return getRepo().findAll();
	}

	@Override
	public T buscar(Long id) throws CrudResourceException {
		return getRepo().findOne(id);
	}

	public abstract CrudRepository<T> getRepo();
}