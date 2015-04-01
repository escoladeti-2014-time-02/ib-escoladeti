package br.unicesumar.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import br.unicesumar.entity.Bairro;
import br.unicesumar.entity.Cidade;

/**
 *
 * @author Eduardo
 */
public interface BairroRepository extends JpaRepository<Bairro, Long> {
    @Query("select b from Bairro b where b.id = :id")
    Bairro findById(@Param("id") Long id);
    
	List<Bairro> findAllByCidade(Cidade cidade);

	Page<Bairro> findByNomeContainingIgnoreCase(String argumentoBusca, Pageable pageable);

	@Query(value = "select b.* from Bairro b join FaixaDeCep fc on (fc.bairro_id = b.id) where fc.cep = :cep", nativeQuery = true)
	Bairro buscarPorCep(@Param("cep") String cep);
}