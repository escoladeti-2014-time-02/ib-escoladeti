package br.unicesumar.entity;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.Enumerated;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.validation.constraints.NotNull;

@Entity
public class Endereco extends EntidadeBase {

    private static final long serialVersionUID = -8263273736235253565L;

    @NotNull
    private String numero;

    private String complemento;

    @ManyToOne
    private Bairro bairro;

    @ManyToOne
    private Logradouro logradouro;

    @Enumerated
    private TipoEndereco tipoEndereco;
    
    @OneToOne(cascade = CascadeType.ALL)
    private GeoLocalizacao geoLocalizacao;

    public Endereco() {
    }

    /*
     * GETTERS E SETTERS
     */
    public void setNumero(String numero) {
        this.numero = numero;
    }

    public void setComplemento(String complemento) {
        this.complemento = complemento;
    }

    public String getNumero() {
        return this.numero;
    }

    public String getComplemento() {
        return this.complemento;
    }

    public Bairro getBairro() {
        return bairro;
    }

    public void setBairro(Bairro bairro) {
        this.bairro = bairro;
    }

    public Logradouro getLogradouro() {
        return logradouro;
    }

    public void setLogradouro(Logradouro logradouro) {
        this.logradouro = logradouro;
    }

    public TipoEndereco getTipoEndereco() {
        return tipoEndereco;
    }

    public void setTipoEndereco(TipoEndereco tipoEndereco) {
        this.tipoEndereco = tipoEndereco;
    }

    public GeoLocalizacao getGeoLocalizacao() {
        return geoLocalizacao;
    }

    public void setGeoLocalizacao(GeoLocalizacao geoLocalizacao) {
        this.geoLocalizacao = geoLocalizacao;
    } 
}
