package br.unicesumar.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import br.unicesumar.entity.Disciplina;

/**
 * @author Melina
 */


public interface DisciplinaRepository extends CrudRepository<Disciplina>{
	
	@Query("select d from Disciplina d where d.id = :id")
	Disciplina findById(@Param("id") Long id);
	
	Page<Disciplina> findByNomeContainingIgnoreCase(String nome, Pageable pageable);
	
}
