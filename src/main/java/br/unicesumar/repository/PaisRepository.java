package br.unicesumar.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import br.unicesumar.entity.Pais;

/**
 *
 * @author Eduardo Gardin
 */
public interface PaisRepository extends CrudRepository<Pais> {

	@Query("select p from Pais p where p.id = :id")
	Pais findById(@Param("id") Long id);

	Page<Pais> findByNomeContainingIgnoreCase(String nome, Pageable pageable);
}