package br.unicesumar.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import br.unicesumar.entity.Pais;
import br.unicesumar.entity.UnidadeFederativa;

/**
 *
 * @author Eduardo Gardin
 */
public interface UnidadeFederativaRepository extends JpaRepository<UnidadeFederativa, Long> {

	@Query("select u from UnidadeFederativa u where u.id = :id")
	UnidadeFederativa findById(@Param("id") Long id);

	@Query("select u from UnidadeFederativa u where u.pais = :pais order by u.nome")
	List<UnidadeFederativa> findAllByPais(@Param("pais") Pais pais);

	Page<UnidadeFederativa> findByNomeContainingIgnoreCase(String nome, Pageable pageable);
}