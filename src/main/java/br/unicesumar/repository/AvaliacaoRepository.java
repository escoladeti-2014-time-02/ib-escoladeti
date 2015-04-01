package br.unicesumar.repository;

/**
*
* @author Matcher
*/
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import br.unicesumar.entity.Avaliacao;

public interface AvaliacaoRepository extends CrudRepository<Avaliacao>{
	@Query("select p from Avaliacao p where p.id = :id")
	Avaliacao findById(@Param("id") Long id);

	Page<Avaliacao> findByLocalContainingIgnoreCase(String local, Pageable pageable);

}
