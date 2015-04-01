package br.unicesumar.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import br.unicesumar.entity.TipoTelefone;
/**
 *
 * @author heidi
 */
public interface TipoTelefoneRepository extends JpaRepository<TipoTelefone, Long>{
    
    @Query("select t from TipoTelefone t where t.id = :id")
    TipoTelefone findById(@Param("id") Long id);
    
}
