    package br.unicesumar.entity;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Bairro extends EntidadeBase {
    /**
     *
     */
    private static final long serialVersionUID = 3165836823433931507L;

	@NotNull
	@Size(min = 3, max=72)
    private String nome;

    @ManyToOne
    private Cidade cidade;

    @JsonIgnore
    @OneToMany(mappedBy = "bairro")
    private List<FaixaDeCep> faixasDeCep;

    public Bairro() {
    	this.faixasDeCep = new ArrayList<FaixaDeCep>();
    }

    /*
     * GETTERS E SETTERS
     * */
    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public Cidade getCidade() {
        return cidade;
    }

    public void setCidade(Cidade cidade) {
        this.cidade = cidade;
    }

    public List<FaixaDeCep> getFaixasDeCep() {
        return faixasDeCep;
    }

    public void setFaixasDeCep(List<FaixaDeCep> faixasDeCep) {
        this.faixasDeCep = faixasDeCep;
    }

}
