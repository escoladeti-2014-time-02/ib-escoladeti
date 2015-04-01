package br.unicesumar.service;

import static br.unicesumar.datapage.DataPage.pageRequestForAsc;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import br.unicesumar.datapage.DataPage;
import br.unicesumar.entity.Cidade;
import br.unicesumar.entity.UnidadeFederativa;
import br.unicesumar.repository.CidadeRepository;

@Service
public class CidadeService {

    @Autowired
    private CidadeRepository cidadeRepository;

    @Autowired
    private UnidadeFederativaService ufService;

    public Cidade salvar(Cidade cidade) {
        return getCidadeRepository().save(cidade);
    }

    public Cidade alterar(Cidade cidade) {
        return getCidadeRepository().saveAndFlush(cidade);
    }

    public DataPage<Cidade> listar(Integer numeroPagina, String argumentoBusca) {
        return new DataPage<>(getCidadeRepository().findByNomeContainingIgnoreCase(argumentoBusca, pageRequestForAsc(numeroPagina, "nome")));
    }

    public List<Cidade> listar() {
        return getCidadeRepository().findAll(new Sort(new Sort.Order(Sort.Direction.ASC, "nome")));
    }

    public void apagar(Cidade cidade) {
        getCidadeRepository().delete(cidade);
        
    }

    public Cidade findById(Long id) {
        return getCidadeRepository().findById(id);
    }

    public List<Cidade> listarPorIdUf(Long idUf) {
        UnidadeFederativa uf = getUfService().findById(idUf);

        if (null != uf) {
            return getCidadeRepository().findAllByUnidadeFederativa(uf);
        }
        return new ArrayList<Cidade>();
    }

    public List<Cidade> listarCidades() {
        return getCidadeRepository().buscarTodosCidades();
    }

    public List<Cidade> listarSomenteCidades() {
    	return getCidadeRepository().buscarTodosCidades();
    }

    /*
     * GETTERS E SETTER
     */
    public CidadeRepository getCidadeRepository() {
        return this.cidadeRepository;
    }

    public UnidadeFederativaService getUfService() {
        return ufService;
    }
}
