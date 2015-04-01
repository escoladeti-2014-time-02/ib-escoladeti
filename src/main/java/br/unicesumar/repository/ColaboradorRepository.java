package br.unicesumar.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import br.unicesumar.entity.Colaborador;

/**
 *
 * @author Matcher
 */

public interface ColaboradorRepository extends CrudRepository<Colaborador>{
	
	@Query("select c from Colaborador c where c.id = :id")
	Colaborador findById(@Param("id") Long id);

	@Query(value = 	"Select c.*, p.*, pf.*, d.*, doc.* from colaborador c join pessoa p on (c.id = p.id) join pessoaFisica pf on (p.id = pf.id) join pessoa_documento d on (pf.id = d.pessoa_id) join documento doc on (doc.id = d.documentos_id) join cpf on (cpf.id = d.documentos_id) where doc.numero = :cpf", nativeQuery = true)
	Colaborador findByCpf(@Param("cpf") String cpf);
	
	
	Page<Colaborador> findByPessoaFisicaNomeContainingIgnoreCase(String argumentoBusca, Pageable pageable);
	
	
}
