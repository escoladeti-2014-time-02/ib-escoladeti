package br.unicesumar.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import br.unicesumar.entity.Logradouro;
/**
 *
 * @author Eduardo
 */
public interface LogradouroRepository extends JpaRepository<Logradouro, Long> {

    @Query("select l from Logradouro l where l.id = :id order by l.nome")
    Logradouro findById(@Param("id") Long id);

	Page<Logradouro> findByNomeContainingIgnoreCase(String argumentoBusca, Pageable pageable);

	@Query(value = "select l.* from Logradouro l join FaixaDeCep fc on (fc.logradouro_id = l.id) join Bairro b on(fc.bairro_id = b.id) where b.id = :idBairro order by b.nome", nativeQuery = true)
	List<Logradouro> listarPorBairro(@Param("idBairro") Long idBairro);

	@Query(value = "select l.* from Logradouro l join FaixaDeCep fc on (fc.logradouro_id = l.id) join Bairro b on(fc.bairro_id = b.id) where fc.cep = :cep", nativeQuery = true)
	Logradouro buscarPorCep(@Param("cep") String cep);
}