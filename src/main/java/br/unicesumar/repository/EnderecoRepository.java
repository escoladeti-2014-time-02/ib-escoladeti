package br.unicesumar.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import br.unicesumar.entity.Endereco;

/**
 *
 * @author Eduardo
 */
public interface EnderecoRepository extends JpaRepository<Endereco, Long> {

    @Query("select e from Endereco e where e.id = :id")
    Endereco findById(@Param("id") Long id);

    @Query(value = "select e.* from Logradouro l join FaixaDeCep fc on (fc.logradouro_id = l.id) join Bairro b on(fc.bairro_id = b.id) join Endereco e on (e.bairro_id = b.id and e.logradouro_id = l.id) where fc.cep = :cep", nativeQuery = true)
    List<Endereco> findByCep(@Param("cep") String cep);
    
}