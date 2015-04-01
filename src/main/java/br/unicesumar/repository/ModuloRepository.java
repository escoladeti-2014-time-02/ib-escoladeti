package br.unicesumar.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import br.unicesumar.entity.Modulo;

/**
 * @author heidi 
 */

public interface ModuloRepository extends CrudRepository<Modulo> {

	@Query("select m from Modulo m where m.id = :id")
	Modulo findById(@Param("id") Long id);

	Page<Modulo> findByNomeContainingIgnoreCase(String nome, Pageable pageable);
}