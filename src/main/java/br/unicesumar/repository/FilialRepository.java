package br.unicesumar.repository;

/**
*
* @author Matcher
*/
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import br.unicesumar.entity.Filial;

public interface FilialRepository extends CrudRepository<Filial>{
	@Query("select f from Filial f where f.id = :id")
	Filial findById(@Param("id") Long id);

	Page<Filial> findByNomeContainingIgnoreCase(String nome, Pageable pageable);

}
