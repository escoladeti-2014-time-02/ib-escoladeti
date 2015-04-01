package br.unicesumar.repository;

import java.util.Date;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import br.unicesumar.entity.Aula;
import br.unicesumar.entity.Disciplina;
import br.unicesumar.entity.Modulo;
import br.unicesumar.entity.Turma;

public interface AulaRepository extends CrudRepository<Aula> {

	@Query("select p from Aula p where p.id = :id")
	Aula findById(@Param("id") Long id);

	Page<Aula> findByDescricaoContainingIgnoreCase(String descricao,
			Pageable pageable);

	Page<Aula> findAll(Pageable pageable);

	Page<Aula> findAllByTurmaAndModuloAndDisciplinaAndDataAula(Turma turma,
			Modulo modulo, Disciplina disciplina, Date data,
			Pageable pageRequestForAsc);
}