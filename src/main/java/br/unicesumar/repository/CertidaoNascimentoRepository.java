package br.unicesumar.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import br.unicesumar.entity.CertidaoNascimento;

public interface CertidaoNascimentoRepository extends JpaRepository<CertidaoNascimento, Long>{
    @Query("select b from CertidaoNascimento b where b.id = :id")
    CertidaoNascimento findById(@Param("id") Long id);
}
