package br.unicesumar.repository;


import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import br.unicesumar.entity.AlunoAula;

public interface AlunoAulaRepository extends CrudRepository<AlunoAula>  {
	
	@Query("select p from AlunoAula p where p.id = :id")
	AlunoAula findById(@Param("id") Long id);
	
}
