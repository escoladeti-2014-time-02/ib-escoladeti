package br.unicesumar.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import br.unicesumar.entity.Cidade;
import br.unicesumar.entity.Distrito;

/**
 *
 * @author Eduardo
 */
public interface DistritoRepository extends JpaRepository<Distrito, Long> {

	Distrito findOneById(Long id);

	@Query("select d from Distrito d where d.cidade = :cidade")
	List<Distrito> findByCidade(@Param("") Cidade cidade);

	Page<Distrito> findByNomeContainingIgnoreCase(String argumentoBusca, Pageable pageable);
}