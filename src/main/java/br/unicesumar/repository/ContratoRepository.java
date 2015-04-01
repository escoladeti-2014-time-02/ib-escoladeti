package br.unicesumar.repository;

import java.util.Date;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import br.unicesumar.entity.Contrato;

public interface ContratoRepository extends CrudRepository<Contrato>{

	@Query("select c from Contrato c where c.id = :id")
	Contrato findById(@Param("id") Long id);

	Page<Contrato> findByIdContainingIgnoreCase(String argumentoBusca, Pageable pageable);
	
	Page<Contrato> findAll(Pageable pageable);
	
	@Query("select c from Contrato c where c.dataTermino >= ?1 and c.dataTermino <= ?2")
	Page<Contrato> filtrarPorData(Date dataInicio, Date dataTermino, Pageable pageable);

	@Query("select c from Contrato c where c.aluno.id = :id")
	Contrato filtrarPorAluno(@Param("id") Long id);
}