package br.unicesumar.service;

import static br.unicesumar.datapage.DataPage.pageRequestForAsc;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import br.unicesumar.datapage.DataPage;
import br.unicesumar.entity.Telefone;
import br.unicesumar.repository.TelefoneRepository;

/**
 *
 * @author heidi
 */
@Service
public class TelefoneService {

    @Autowired
    private TelefoneRepository telefoneRepository;

    public Telefone salvar(Telefone telefone) {
        return getTelefoneRepository().save(telefone);
    }

    public Telefone alterar(Telefone telefone) {
        return getTelefoneRepository().saveAndFlush(telefone);
    }

    public DataPage<Telefone> listar(Integer page, String argumentoBusca) {
        return new DataPage<>(getTelefoneRepository().findByNumeroContainingIgnoreCase(argumentoBusca, pageRequestForAsc(page, "numero")));
    }

    public void apagar(Telefone telefone) {
        getTelefoneRepository().delete(telefone);
    }

    public Telefone findById(Long id) {
        return getTelefoneRepository().findById(id);
    }

    public List<Telefone> listar() {
        return getTelefoneRepository().findAll(
                new Sort(new Sort.Order(Sort.Direction.ASC, "numero")));
    }

    public TelefoneRepository getTelefoneRepository() {
        return telefoneRepository;
    }
    
}
