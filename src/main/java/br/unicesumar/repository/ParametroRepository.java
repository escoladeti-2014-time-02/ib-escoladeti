package br.unicesumar.repository;

import org.springframework.data.jpa.repository.Query;

import br.unicesumar.entity.Parametro;

/**
 * 
 * @author heidi
 *
*/

public interface ParametroRepository extends CrudRepository<Parametro> {
	
	@Query("select p from Parametro p")
	Parametro findFirstParametro();
}
