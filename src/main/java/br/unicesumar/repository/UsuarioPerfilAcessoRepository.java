package br.unicesumar.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import br.unicesumar.entity.UsuarioPerfilAcesso;

public interface UsuarioPerfilAcessoRepository extends JpaRepository<UsuarioPerfilAcesso, Long> {
	@Query("select p from UsuarioPerfilAcesso p where p.id = :id")
	UsuarioPerfilAcesso findById(@Param("id") Long id);

}
