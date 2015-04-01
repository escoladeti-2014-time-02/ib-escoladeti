package br.unicesumar.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import br.unicesumar.entity.CarteiraTrabalho;

public interface CarteiraTrabalhoRepository extends JpaRepository<CarteiraTrabalho, Long> {
    @Query("select b from CarteiraTrabalho b where b.id = :id")
    CarteiraTrabalho findById(@Param("id") Long id);
}
