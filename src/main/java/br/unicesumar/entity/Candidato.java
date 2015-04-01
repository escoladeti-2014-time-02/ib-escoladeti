package br.unicesumar.entity;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@JsonIgnoreProperties(ignoreUnknown = true)
public class Candidato extends PessoaFisica {
	private static final long serialVersionUID = -9181921605544759369L;

	@JsonIgnore
	@OneToMany(mappedBy = "candidato")
	private List<Evento> eventos;

	@OneToOne(cascade = CascadeType.ALL)
	private PessoaFisica pai;

	@OneToOne(cascade = CascadeType.ALL)
	private PessoaFisica mae;

	@Enumerated
	private Etnia etnia;

	@Enumerated
	private HabilidadeManual habilidadeManual;

	private String deficiencia;

	@NotNull
	private String serieEscolar;

	@OneToMany(cascade = { CascadeType.PERSIST, CascadeType.REFRESH }, fetch = FetchType.LAZY)
	private List<Idioma> idiomas;

	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private List<Filho> filhos;

	@Enumerated
	private Turno turno;

	@Enumerated
	private Formacao formacao;

	@ManyToOne(fetch = FetchType.EAGER)
	private InstituicaoEnsino instituicaoEnsino;

	@Enumerated
	private MedidaSocioEducativa medidaSocioEducativa;

	@Enumerated
	private AreaResidencia areaResidencia;

	private Boolean basicoEmInformatica;

	private String primeiraPretensaoProfissional;

	private String segundaPretensaoProfissional;

	private String terceiraPretensaoProfissional;

	private Boolean jaTrabalhou;

	// Caso já tenha trabalhado os dois próximos campos precisam ser preenchidos
	private Boolean trabalhoRemunerado;

	private Boolean trabalhoComCtps;

	private Boolean trabalhoVoluntario;

	private Boolean dificuldadeLocomocao;

	@OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	private DadosSocioEconomicos dadosSocioEconomicos;

	@OneToOne(cascade = CascadeType.ALL)
	private Imagem foto;

	public Candidato() {
		inicializarPaiMae();
		this.dadosSocioEconomicos = new DadosSocioEconomicos();
		this.instituicaoEnsino = new InstituicaoEnsino();
		this.filhos = new ArrayList<Filho>();
		this.eventos = new ArrayList<Evento>();
	}

	public Candidato(Long id, String nome) {
		this();
		setId(id);
		setNome(nome);
	}

	private void inicializarPaiMae() {
		this.pai = new PessoaFisica();
		this.mae = new PessoaFisica();

		this.pai.setSexo(Sexo.Masculino);
		this.mae.setSexo(Sexo.Feminino);
	}

	/*
	 * GETTERS E SETTERS
	 */
	public String getDeficiencia() {
		return deficiencia;
	}

	public Boolean isTrabalhoRemunerado() {
		return trabalhoRemunerado;
	}

	public void setTrabalhoRemunerado(Boolean isTrabalhoRemunerado) {
		this.trabalhoRemunerado = isTrabalhoRemunerado;
	}

	public DadosSocioEconomicos getDadosSocioEconomicos() {
		return dadosSocioEconomicos;
	}

	public void setDadosSocioEconomicos(
			DadosSocioEconomicos dadosSocioEconomicos) {
		this.dadosSocioEconomicos = dadosSocioEconomicos;
	}

	public MedidaSocioEducativa getMedidaSocioEducativa() {
		return medidaSocioEducativa;
	}

	public void setMedidaSocioEducativa(
			MedidaSocioEducativa medidaSocioEducativa) {
		this.medidaSocioEducativa = medidaSocioEducativa;
	}

	public void setDeficiencia(String deficiencia) {
		this.deficiencia = deficiencia;
	}

	public List<Idioma> getIdiomas() {
		return idiomas;
	}

	public void setIdiomas(List<Idioma> idiomas) {
		this.idiomas = idiomas;
	}

	public Turno getTurno() {
		return turno;
	}

	public void setTurno(Turno turno) {
		this.turno = turno;
	}

	public Formacao getFormacao() {
		return formacao;
	}

	public void setFormacao(Formacao formacao) {
		this.formacao = formacao;
	}

	public InstituicaoEnsino getInstituicaoEnsino() {
		return instituicaoEnsino;
	}

	public void setInstituicaoEnsino(InstituicaoEnsino instituicaoEnsino) {
		this.instituicaoEnsino = instituicaoEnsino;
	}

	public String getSerieEscolar() {
		return serieEscolar;
	}

	public void setSerieEscolar(String serieEscolar) {
		this.serieEscolar = serieEscolar;
	}

	public List<Filho> getFilhos() {
		return filhos;
	}

	public void setFilhos(List<Filho> filhos) {
		this.filhos = filhos;
	}

	public Etnia getEtnia() {
		return etnia;
	}

	public void setEtnia(Etnia etnia) {
		this.etnia = etnia;
	}

	public AreaResidencia getAreaResidencia() {
		return areaResidencia;
	}

	public void setAreaResidencia(AreaResidencia areaResidencia) {
		this.areaResidencia = areaResidencia;
	}

	public Boolean isBasicoEmInformatica() {
		return basicoEmInformatica;
	}

	public void setBasicoEmInformatica(Boolean basicoEmInformatica) {
		this.basicoEmInformatica = basicoEmInformatica;
	}

	public String getPrimeiraPretensaoProfissional() {
		return primeiraPretensaoProfissional;
	}

	public void setPrimeiraPretensaoProfissional(
			String primeiraPretensaoProfissional) {
		this.primeiraPretensaoProfissional = primeiraPretensaoProfissional;
	}

	public String getSegundaPretensaoProfissional() {
		return segundaPretensaoProfissional;
	}

	public void setSegundaPretensaoProfissional(
			String segundaPretensaoProfissional) {
		this.segundaPretensaoProfissional = segundaPretensaoProfissional;
	}

	public String getTerceiraPretensaoProfissional() {
		return terceiraPretensaoProfissional;
	}

	public void setTerceiraPretensaoProfissional(
			String terceiraPretensaoProfissional) {
		this.terceiraPretensaoProfissional = terceiraPretensaoProfissional;
	}

	public Boolean isJaTrabalhou() {
		return jaTrabalhou;
	}

	public void setJaTrabalhou(Boolean jaTrabalhou) {
		this.jaTrabalhou = jaTrabalhou;
	}

	public Boolean isIsTrabalhoRemunerado() {
		return trabalhoRemunerado;
	}

	public void setIsTrabalhoRemunerado(Boolean isTrabalhoRemunerado) {
		this.trabalhoRemunerado = isTrabalhoRemunerado;
	}

	public Boolean isTrabalhoComCtps() {
		return trabalhoComCtps;
	}

	public void setTrabalhoComCtps(Boolean trabalhoComCtps) {
		this.trabalhoComCtps = trabalhoComCtps;
	}

	public Boolean isTrabalhoVoluntario() {
		return trabalhoVoluntario;
	}

	public void setTrabalhoVoluntario(Boolean trabalhoVoluntario) {
		this.trabalhoVoluntario = trabalhoVoluntario;
	}

	public Boolean isDificuldadeLocomocao() {
		return dificuldadeLocomocao;
	}

	public void setDificuldadeLocomocao(Boolean dificuldadeLocomocao) {
		this.dificuldadeLocomocao = dificuldadeLocomocao;
	}

	public PessoaFisica getPai() {
		return pai;
	}

	public void setPai(PessoaFisica pai) {
		this.pai = pai;
	}

	public PessoaFisica getMae() {
		return mae;
	}

	public void setMae(PessoaFisica mae) {
		this.mae = mae;
	}

	public List<Evento> getEventos() {
		return eventos;
	}

	public void setEventos(List<Evento> eventos) {
		this.eventos = eventos;
	}

	public HabilidadeManual getHabilidadeManual() {
		return habilidadeManual;
	}

	public void setHabilidadeManual(HabilidadeManual habilidadeManual) {
		this.habilidadeManual = habilidadeManual;
	}

	public Imagem getFoto() {
		return foto;
	}

	public void setFoto(Imagem foto) {
		this.foto = foto;
	}

	public Boolean getBasicoEmInformatica() {
		return basicoEmInformatica;
	}

	public Boolean getJaTrabalhou() {
		return jaTrabalhou;
	}

	public Boolean getTrabalhoRemunerado() {
		return trabalhoRemunerado;
	}

	public Boolean getTrabalhoComCtps() {
		return trabalhoComCtps;
	}

	public Boolean getTrabalhoVoluntario() {
		return trabalhoVoluntario;
	}

	public Boolean getDificuldadeLocomocao() {
		return dificuldadeLocomocao;
	}
	
	@Override
	public boolean equals(Object obj) {
		if(obj instanceof Candidato) {
			Candidato candidato = (Candidato) obj;
			return candidato.getId().equals(this.getId());
		}
		return false;
	}
}