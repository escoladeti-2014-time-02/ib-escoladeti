package br.unicesumar.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import br.unicesumar.entity.Rg;

public interface RgRepository extends JpaRepository<Rg, Long>{
    @Query("select b from Rg b where b.id = :id")
    Rg findById(@Param("id") Long id);
}
