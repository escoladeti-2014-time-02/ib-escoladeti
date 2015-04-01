package br.unicesumar.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import br.unicesumar.entity.Cidade;
import br.unicesumar.entity.UnidadeFederativa;

/**
 *
 * @author Eduardo
 */
public interface CidadeRepository extends JpaRepository<Cidade, Long> {

    @Query("select c from Cidade c where c.id = :id")
    Cidade findById(@Param("id") Long id);

    @Query("select c from Cidade c where c.unidadeFederativa = :uf order by c.nome")
	List<Cidade> findAllByUnidadeFederativa(@Param("uf") UnidadeFederativa uf);

    @Query(value = "select c from Cidade c where TYPE(c) = Cidade ")
    List<Cidade> buscarTodosCidades();

    Page<Cidade> findByNomeContainingIgnoreCase(String nome, Pageable pageable);
}