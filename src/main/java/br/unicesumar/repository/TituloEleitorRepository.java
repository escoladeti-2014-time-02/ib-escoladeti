package br.unicesumar.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import br.unicesumar.entity.TituloEleitor;

public interface TituloEleitorRepository extends JpaRepository<TituloEleitor, Long>{
    @Query("select b from TituloEleitor b where b.id = :id")
    TituloEleitor findById(@Param("id") Long id);
}
