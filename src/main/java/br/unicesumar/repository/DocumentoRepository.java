package br.unicesumar.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import br.unicesumar.entity.Documento;

public interface DocumentoRepository extends CrudRepository<Documento>{

	@Query("select d from Documento d where d.id = :id")
	Documento findById(@Param("id") Long id);
}