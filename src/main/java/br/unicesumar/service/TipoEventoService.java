package br.unicesumar.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.unicesumar.entity.TipoEvento;
import br.unicesumar.repository.CrudRepository;
import br.unicesumar.repository.TipoEventoRepository;

@Service
public class TipoEventoService extends CrudServiceTemplate<TipoEvento> {

	@Autowired 
	private TipoEventoRepository tipoEventoRepo;

	@Override
	public CrudRepository<TipoEvento> getRepo() {
		return this.tipoEventoRepo;
	}
}