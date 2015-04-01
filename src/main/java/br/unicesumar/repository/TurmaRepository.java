package br.unicesumar.repository;

import java.util.Date;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import br.unicesumar.entity.Aluno;
import br.unicesumar.entity.Turma;

public interface TurmaRepository extends CrudRepository<Turma> {

	@Query("select c from Turma c where c.id = :id")
	Turma findById(@Param("id") Long id);

	Page<Turma> findByNomeContainingIgnoreCase(String nome, Pageable pageable);

	List<Turma> findByNomeContainingIgnoreCase(String nome);
	
	@Query("select t from Turma t where upper(t.nome) like ?1 or t.dataEncerramento <= ?2")
	Page<Turma> findAllByDescricao(String nome, Date dataEncerramento,
			Pageable pageable);

	@Query("select a from Turma t join t.aluno a where t.id = ?1")
	Page<Aluno> findAllAlunosByTurma(Long idTurma, Pageable pageable);

	@Query("select a from Turma t join t.aluno a where t.id = ?1 and upper(a.candidato.nome) like ?2 order by a.candidato.nome")
	Page<Aluno> findAllAlunosByTurmaAndNome(Long idTurma, String nome,
			Pageable pageable);
    
    @Query("select t from Turma t join t.aluno a where a.id = ?1") 
    Turma findTurmaByAluno(Long idAluno);

}