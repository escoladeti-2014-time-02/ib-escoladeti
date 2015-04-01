package br.unicesumar.service;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.unicesumar.entity.Candidato;
import br.unicesumar.entity.Evento;
import br.unicesumar.entity.TipoEvento;
import br.unicesumar.exception.CandidatoException;
import br.unicesumar.exception.CrudResourceException;
import br.unicesumar.repository.EventoRepository;

@Service
public class EventoService extends CrudServiceTemplate<Evento> {
	
	@Autowired
	private EventoRepository eventoRepo;
	
	@Autowired
	private TipoEventoService tipoEventoService;
	
	@Autowired
	private CandidatoService candidatoService;

	@Override
	public EventoRepository getRepo() {
		return this.eventoRepo;
	}

	public List<TipoEvento> listarTiposEvento() throws CrudResourceException {
		return tipoEventoService.listarTodas();
	}

	public Evento salvar(Evento entidade, Long idCandidato) throws CandidatoException, CrudResourceException {
		Candidato candidato = getCandidatoService().findById(idCandidato);
		
		if(candidato != null) {
			entidade.setCandidato(candidato);
		} else {
			throw new CandidatoException("Não é possível cadastrar evento para uma candidato inexistente");
		}
		return this.salvar(entidade);
	}
	
	public Evento atualizar(Evento entidade, Long idCandidato) throws CandidatoException, CrudResourceException {
		Candidato candidato = getCandidatoService().findById(idCandidato);
		
		if(candidato != null) {
			entidade.setCandidato(candidato);
		} else {
			throw new CandidatoException("Não é possível atualizar evento para uma candidato inexistente");
		}
		return this.atualizar(entidade);
	}

	public List<Evento> listarPorCandidato(Long idCandidato) throws CandidatoException {
		Candidato candidato = getCandidatoService().findById(idCandidato);

		if(candidato == null) {
			throw new CandidatoException("Não é possível listar os eventos de um candidato que não existe");
		}
		return getRepo().findAllByCandidato(candidato);
	}

	public Evento adicionarEventoCandidato(Long idCandidato, String titulo, String descricao, TipoEvento tipoEvento) throws CandidatoException, CrudResourceException {
		Evento evento = new Evento();
		evento.setTipoEvento(tipoEvento);
		evento.setDataEvento(new Date());
		evento.setTitulo(titulo);
		evento.setDescricaoEvento(descricao);

		return this.salvar(evento, idCandidato);
	}

	public Evento adicionarEventoCandidatoFimContrato(Long idCandidato, String titulo, String descricao, TipoEvento tipoEvento, Date data) throws CandidatoException, CrudResourceException {
		Evento evento = new Evento();
		evento.setTipoEvento(tipoEvento);
		evento.setDataEvento(data);
		evento.setTitulo(titulo);
		evento.setDescricaoEvento(descricao);

		return this.salvar(evento, idCandidato);
	}	
	/*
	 * GETTERS E SETTERS
	 */
	public TipoEventoService getTipoEventoService() {
		return tipoEventoService;
	}

	public CandidatoService getCandidatoService() {
		return candidatoService;
	}
}