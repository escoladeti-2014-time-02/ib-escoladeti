package br.unicesumar.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import br.unicesumar.entity.Reservista;

public interface ReservistaRepository extends JpaRepository<Reservista, Long>{
    @Query("select b from Reservista b where b.id = :id")
    Reservista findById(@Param("id") Long id);
}
