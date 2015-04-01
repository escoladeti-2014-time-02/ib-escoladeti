package br.unicesumar.resource;

import java.util.List;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 *
 * @author Eduardo
 */
public interface CrudResource<T> {

    T salvar(@RequestBody T entidade);
    T atualizar(@RequestBody T entidade);
    void apagar(@RequestBody T entidade);
    @ResponseBody List<T> listar();
    T buscar (@PathVariable Long id);
}