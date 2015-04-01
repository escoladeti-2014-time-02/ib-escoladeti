package br.unicesumar.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.unicesumar.entity.FaixaDeCep;

/**
 *
 * @author Eduardo
 */
public interface FaixaDeCepRepository extends JpaRepository<FaixaDeCep, Long> {
    
}
