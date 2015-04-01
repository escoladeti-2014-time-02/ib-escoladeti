package br.unicesumar.repository;

import java.util.Date;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import br.unicesumar.entity.Candidato;

/**
*
* @author Melina
*/
public interface CandidatoRepository extends JpaRepository<Candidato, Long> {

	@Query("select c from Candidato c where c.id = :id")
	Candidato findById(@Param("id") Long id);

	Page<Candidato> findByNomeContainingIgnoreCase(String argumentoBusca, Pageable pageable);

	@Query("select distinct c from Candidato c"
			+ " join c.documentos doc where TYPE(doc) = CertidaoNascimento"
			+ " and (doc.dataNascimento between :dataInicial and :dataFinal)"
			+ " and (c.dadosSocioEconomicos.rendaPerCapita between :rendaMinima and :rendaMaxima)"
			+ " or c.dadosSocioEconomicos.rendaPerCapita = 0")
	List<Candidato> findByFaixaRenda(@Param("rendaMinima") Double rendaMinima, @Param("rendaMaxima") Double rendaMaxima,
			@Param("dataInicial") Date dataInicial, @Param("dataFinal") Date dataFinal);

	List<Candidato> findByNomeContainingIgnoreCase(String nome);
}