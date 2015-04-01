package br.unicesumar.repository;

/**
 *
 * @author Matcher
 */
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import br.unicesumar.entity.Candidato;
import br.unicesumar.entity.CandidatoProcessoSeletivo;
import br.unicesumar.entity.NivelCandidatoProcesso;
import br.unicesumar.entity.StatusProcessoSeletivo;

public interface CandidatoProcessoSeletivoRepository extends
		CrudRepository<CandidatoProcessoSeletivo> {

	@Query("select cp from CandidatoProcessoSeletivo cp where cp.id = :id")
	CandidatoProcessoSeletivo findById(@Param("id") Long id);

	@Query("select cp from ProcessoSeletivo p "
			+ " join p.candidatosProcessoSeletivo cp "
			+ " where p.id = :idProcesso and cp.nivelCandidatoProcesso in (:niveis)"
			+ " order by cp.candidato.nome")
	Page<CandidatoProcessoSeletivo> findByNivel(
			@Param("idProcesso") Long idProcesso,
			@Param("niveis") List<NivelCandidatoProcesso> niveis,
			Pageable pageable);

	@Query("select cp from ProcessoSeletivo p join p.candidatosProcessoSeletivo cp"
			+ " where p.id = :idProcesso and cp.nivelCandidatoProcesso in :niveis order by cp.candidato.nome")
	List<CandidatoProcessoSeletivo> findByNivel(
			@Param("idProcesso") Long idProcesso,
			@Param("niveis") List<NivelCandidatoProcesso> niveis);
	
	@Query("select cp.id from ProcessoSeletivo p join p.candidatosProcessoSeletivo cp"
			+ " where p.id = :idProcesso and cp.nivelCandidatoProcesso in :niveis order by cp.candidato.nome")
	List<Long> findIdsByNivel(
			@Param("idProcesso") Long idProcesso,
			@Param("niveis") List<NivelCandidatoProcesso> niveis);

	@Query("select cp.candidato from ProcessoSeletivo p join p.candidatosProcessoSeletivo cp"
			+ " where p.id = :idProcesso and p.statusProcessoSeletivo = :nivelProcesso and cp.nivelCandidatoProcesso = :nivelCandidato "
			+ " order by cp.candidato.nome")
	List<Candidato> findCandidatoByNivelProcesso(@Param("idProcesso") Long idProcesso, @Param("nivelProcesso") StatusProcessoSeletivo status,
			@Param("nivelCandidato") NivelCandidatoProcesso nivelCandidatoProcesso);

	@Query(nativeQuery = true, value = ""
			+ " select can.id, p.nome"
			+ " from Candidato can"
			+ " join pessoafisica pf on (pf.id = can.id)"
			+ " join pessoa p on (p.id = pf.id)"
			+ " where can.id not in"
			+ " ( select c.id from CandidatoProcessoSeletivo cps"
			+ "			      join Candidato c on (cps.candidato_id = c.id)"
			+ "               where cps.processoseletivo_id = ?1"
			+ " )"
			+ " and upper(p.nome) like ?2")
	List<Object[]> findAllForaProcesso(Long idProcesso, String nome);
	
	@Modifying
	@Query("update CandidatoProcessoSeletivo set nivelCandidatoProcesso = :nivel where id = :idCandidatoProcesso")
	@Transactional
	void alterarNivelCandidato(@Param("idCandidatoProcesso") Long idCandidatoProcesso,
			@Param("nivel") NivelCandidatoProcesso nivel);

	@Modifying
	@Query("update CandidatoProcessoSeletivo set nivelCandidatoProcesso = :nivel where id in (:idCandidatosProcesso)")
	@Transactional
	void alterarNivelCandidatos(@Param("idCandidatosProcesso") List<Long> idCandidatoProcesso,
			@Param("nivel") NivelCandidatoProcesso nivel);

}