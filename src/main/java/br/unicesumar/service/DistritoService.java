package br.unicesumar.service;

import static br.unicesumar.datapage.DataPage.pageRequestForAsc;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.unicesumar.datapage.DataPage;
import br.unicesumar.entity.Cidade;
import br.unicesumar.entity.Distrito;
import br.unicesumar.repository.DistritoRepository;

@Service
public class DistritoService {

    @Autowired
    private DistritoRepository distritoRepository;

    @Autowired
    private CidadeService cidadeService;

    public Distrito buscarPorId(Long id) {
        return getDistritoRepository().findOneById(id);
    }

    public Distrito salvar(Distrito entidade) {
        return getDistritoRepository().save(entidade);
    }

    public Distrito alterar(Distrito entidade) {
        return getDistritoRepository().saveAndFlush(entidade);
    }

    public List<Distrito> listar() {
        return getDistritoRepository().findAll();
    }

    public void apagar(Distrito entidade) {
        getDistritoRepository().delete(entidade);
    }

    public DataPage<Distrito> listar(Integer numeroPagina, String argumentoBusca) {
        return new DataPage<>(getDistritoRepository().findByNomeContainingIgnoreCase(argumentoBusca, pageRequestForAsc(numeroPagina, "nome")));
    }

    public List<Distrito> listarPorCidade(Long id) {
        Cidade cidade = getCidadeService().findById(id);
        if (null != null) {
            return getDistritoRepository().findByCidade(cidade);
        }
        return new ArrayList<>();
    }

    public Distrito findById(Long id) {
        return getDistritoRepository().findOneById(id);
    }
    /*
     * GETTERS E SETTERS
     */

    public DistritoRepository getDistritoRepository() {
        return distritoRepository;
    }

    public CidadeService getCidadeService() {
        return cidadeService;
    }
}
