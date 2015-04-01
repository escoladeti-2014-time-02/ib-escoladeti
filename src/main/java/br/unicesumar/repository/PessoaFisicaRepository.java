package br.unicesumar.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import br.unicesumar.entity.Candidato;
import br.unicesumar.entity.PessoaFisica;

public interface PessoaFisicaRepository extends JpaRepository<PessoaFisica, Long> {
	
	@Query("select c from Candidato c join c.documentos doc where TYPE(doc) = Cpf AND doc.numero = :cpf")
	Candidato findByCpf(@Param("cpf") String cpf);
}