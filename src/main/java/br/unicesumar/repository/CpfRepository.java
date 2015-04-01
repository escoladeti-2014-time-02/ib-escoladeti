package br.unicesumar.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import br.unicesumar.entity.Cpf;

public interface CpfRepository extends JpaRepository<Cpf, Long>{
    @Query("select b from Cpf b where b.id = :id")
    Cpf findById(@Param("id") Long id);
}
