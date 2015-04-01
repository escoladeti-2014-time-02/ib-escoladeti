package br.unicesumar.repository;

import java.util.List;

import br.unicesumar.entity.Candidato;
import br.unicesumar.entity.Evento;

public interface EventoRepository extends CrudRepository<Evento> {

	List<Evento> findAllByCandidato(Candidato candidato);
}