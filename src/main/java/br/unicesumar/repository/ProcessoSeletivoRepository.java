package br.unicesumar.repository;

import java.util.Date;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

/**
 *
 * @author Matcher
 */
import br.unicesumar.entity.ProcessoSeletivo;
import br.unicesumar.entity.StatusProcessoSeletivo;

public interface ProcessoSeletivoRepository extends
		CrudRepository<ProcessoSeletivo> {

	Page<ProcessoSeletivo> findByDescricaoContainingIgnoreCase(String busca,
			Pageable pageable);

	@Query(nativeQuery = true, value = ""
			+ " select count(ps.id)"
			+ " from ProcessoSeletivo ps"
			+ " JOIN ProcessoSeletivo_candidatoprocessoseletivo ps_cps ON (ps_cps.processoseletivo_id = ps.id)"
			+ " JOIN CandidatoProcessoSeletivo cps ON (cps.id = ps_cps.candidatosprocessoseletivo_id)"
			+ " WHERE cps.nivelcandidatoprocesso = :nivel and ps.id = :idProcesso")
	Long getQuantidadeCandidatosNivel(@Param("idProcesso") Long idProcesso,
			@Param("nivel") Integer nivel);

	@Query("select ps from ProcessoSeletivo ps where ps.statusProcessoSeletivo = :statusProcesso")
	List<ProcessoSeletivo> listarProcessosConcluidos(
			@Param("statusProcesso") StatusProcessoSeletivo statusProcessoSeletivo);

	@Query("select p from ProcessoSeletivo p where (p.dataInicio >= ?1 and p.dataFim <= ?2) or (upper(p.descricao) like ?3)")
	Page<ProcessoSeletivo> findAllByDataAndDescricao(Date dataInicio,
			Date dataFim, String descricao, Pageable pageable);
}