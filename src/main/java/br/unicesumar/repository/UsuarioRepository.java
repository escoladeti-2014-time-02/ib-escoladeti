package br.unicesumar.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import br.unicesumar.entity.Usuario;

/**
 *
 * @author Eduardo
 */
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

	@Query("select p from Usuario p where p.id = :id")
	Usuario findById(@Param("id") Long id);

	Page<Usuario> findByLoginContainingIgnoreCase(String argumentoBusca, Pageable pageable);
}