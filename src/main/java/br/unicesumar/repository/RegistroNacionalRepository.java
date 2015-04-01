package br.unicesumar.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import br.unicesumar.entity.RegistroNacional;

public interface RegistroNacionalRepository extends JpaRepository<RegistroNacional, Long>{
    @Query("select b from RegistroNacional b where b.id = :id")
    RegistroNacional findById(@Param("id") Long id);
}
