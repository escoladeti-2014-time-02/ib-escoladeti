package br.unicesumar.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import br.unicesumar.entity.PessoaJuridica;


public interface PessoaJuridicaRepository extends JpaRepository<PessoaJuridica, Long> {
    @Query("select p from PessoaJuridica p where p.id = :id")
    PessoaJuridica findById(@Param("id") Long id);
}
