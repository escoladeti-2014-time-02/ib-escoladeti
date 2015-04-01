package br.unicesumar.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import br.unicesumar.entity.Telefone;
/**
 *
 * @author heidi
 */
public interface TelefoneRepository extends JpaRepository<Telefone, Long> {

    @Query("select t from Telefone t where t.id = :id")
    Telefone findById(@Param("id") Long id);
    
    Page<Telefone> findByNumeroContainingIgnoreCase(String numero, Pageable pageable);
}
