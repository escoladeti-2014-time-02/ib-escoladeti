/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package br.unicesumar.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import br.unicesumar.entity.PerfilDeAcesso;

/**
 *
 * @author Matcher
 */
public interface PerfilDeAcessoRepository extends JpaRepository<PerfilDeAcesso, Long>{
    @Query("select p from PerfilDeAcesso p where p.id = :id")
    PerfilDeAcesso findById(@Param("id") Long id);
    
}
