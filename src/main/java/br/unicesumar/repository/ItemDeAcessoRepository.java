package br.unicesumar.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import br.unicesumar.entity.ItemDeAcesso;

public interface ItemDeAcessoRepository extends JpaRepository<ItemDeAcesso, Long>{
	
	@Query("select p from ItemDeAcesso p where p.id = :id")
	ItemDeAcesso findById(@Param("id") Long id);
}
