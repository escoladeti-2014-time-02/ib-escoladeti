package br.unicesumar.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import br.unicesumar.entity.Curso;


public interface CursoRepository extends CrudRepository<Curso>{
	
	@Query("select c from Curso c where c.id = :id")
	Curso findById(@Param("id") Long id);
	
	//@Query("select c from Curso c where c.modulo= :modulo order by c.nome")
	//List<Curso> findAllByModulo(@Param("modulo") Modulo modulo);
	
	Page<Curso> findByNomeContainingIgnoreCase(String nome, Pageable pageable);

}
