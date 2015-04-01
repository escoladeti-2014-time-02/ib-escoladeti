package br.unicesumar.repository;

/**
*
* @author Matcher
*/
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import br.unicesumar.entity.Empresa;
import br.unicesumar.entity.EmpresaProcessoSeletivo;

public interface EmpresaRepository extends CrudRepository<Empresa> {

	@Query("select e from Empresa e where e.id = :id")
	Empresa findById(@Param("id") Long id);

	Page<Empresa> findByNomeContainingIgnoreCase(String nome, Pageable pageable);

	@Query("select e from Empresa e where e not in ( select ep.empresa from ProcessoSeletivo p join p.empresasParticipantes ep where p.id =:idProcesso )")
	List<EmpresaProcessoSeletivo> findEmpresasNaoParticipantesProcesso(@Param("idProcesso") Long idProcesso);

	@Query("select ep from ProcessoSeletivo p join p.empresasParticipantes ep where p.id =:idProcesso")
	List<EmpresaProcessoSeletivo> findEmpresasDoProcesso(@Param("idProcesso") Long idProcesso);
	
    @Query(value = "select e from Empresa e where TYPE(e) = Empresa ")
    List<Empresa> buscarTodoasEmpresas();
}