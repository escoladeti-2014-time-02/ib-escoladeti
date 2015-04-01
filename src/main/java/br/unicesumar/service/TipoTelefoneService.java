package br.unicesumar.service;

import static br.unicesumar.datapage.DataPage.pageRequestForAsc;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import br.unicesumar.datapage.DataPage;
import br.unicesumar.entity.TipoTelefone;
import br.unicesumar.repository.TipoTelefoneRepository;

/**
 *
 * @author heidi
 */
@Service
public class TipoTelefoneService {

    @Autowired
    private TipoTelefoneRepository tipoTelefoneRepository;

    public TipoTelefone salvar(TipoTelefone tipoTelefone) {
        return getTipoTelefoneRepository().save(tipoTelefone);
    }

    public TipoTelefone alterar(TipoTelefone tipoTelefone) {
        return getTipoTelefoneRepository().saveAndFlush(tipoTelefone);
    }

    public DataPage<TipoTelefone> listar(Integer page, String argumentoBusca) {
        return new DataPage<>(getTipoTelefoneRepository().findAll(pageRequestForAsc(page, "id")));
    }

    public void apagar(TipoTelefone tipoTelefone) {
        getTipoTelefoneRepository().delete(tipoTelefone);
    }

    public TipoTelefone findById(Long id) {
        return getTipoTelefoneRepository().findById(id);
    }

    public List<TipoTelefone> listar() {
        return getTipoTelefoneRepository().findAll(
                new Sort(new Sort.Order(Sort.Direction.ASC, "id")));
    }

    public TipoTelefoneRepository getTipoTelefoneRepository() {
        return tipoTelefoneRepository;
    }
    
}
