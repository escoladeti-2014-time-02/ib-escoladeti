package br.unicesumar.resource;

import java.util.List;

import org.springframework.stereotype.Component;

import br.unicesumar.exception.CrudResourceException;

@Component
public interface ICrudResource<T> {
	T salvar(T entidade) throws CrudResourceException;
	T atualizar(T entidade) throws CrudResourceException;
	void excluir(T entidade) throws CrudResourceException;
	List<T> listarTodas() throws CrudResourceException;
	T buscar(Long id) throws CrudResourceException;
}