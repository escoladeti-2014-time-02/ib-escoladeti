
package br.unicesumar.repository;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import br.unicesumar.entity.InstituicaoEnsino;

/**
 *
 * @author Matcher
 */
public interface InstituicaoEnsinoRepository extends JpaRepository<InstituicaoEnsino, Long>{
    	@Query("select c from InstituicaoEnsino c where c.id = :id")
	InstituicaoEnsino findById(@Param("id") Long id);
    
        Page<InstituicaoEnsino> findByNomeContainingIgnoreCase(String nome, Pageable pageable);
}
