package br.unicesumar.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import br.unicesumar.entity.ItemDeAcessoUsuario;

public interface ItemDeAcessoUsuarioRepository extends JpaRepository<ItemDeAcessoUsuario, Long>{
	@Query("select p from ItemDeAcessoUsuario p where p.id = :id")
	ItemDeAcessoUsuario findById(@Param("id") Long id);
}
