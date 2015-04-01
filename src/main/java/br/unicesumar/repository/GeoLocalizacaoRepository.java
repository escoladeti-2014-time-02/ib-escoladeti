package br.unicesumar.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import br.unicesumar.entity.GeoLocalizacao;
import br.unicesumar.entity.TipoTelefone;


public interface GeoLocalizacaoRepository extends JpaRepository<GeoLocalizacao, Long>{
    @Query("select g from GeoLocalizacao g where t.id = :id")
    TipoTelefone findById(@Param("id") Long id);
}
