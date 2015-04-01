package br.unicesumar.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import br.unicesumar.entity.CarteiraHabilitacao;

public interface CarteiraHabilitacaoRepository extends JpaRepository<CarteiraHabilitacao, Long>{
    @Query("select b from CarteiraHabilitacao b where b.id = :id")
    CarteiraHabilitacao findById(@Param("id") Long id);
}
