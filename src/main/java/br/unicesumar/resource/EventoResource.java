package br.unicesumar.resource;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import br.unicesumar.entity.Evento;
import br.unicesumar.entity.TipoEvento;
import br.unicesumar.exception.CandidatoException;
import br.unicesumar.exception.CrudResourceException;
import br.unicesumar.service.EventoService;

@RequestMapping("/rest/evento")
@Controller
public class EventoResource {

	@Autowired
	private EventoService eventoService;

	@RequestMapping(value = "/{idCandidato}", method = RequestMethod.POST)
	public @ResponseBody Evento salvar(@RequestBody Evento entidade, @PathVariable Long idCandidato) throws CrudResourceException, CandidatoException {
		return getService().salvar(entidade, idCandidato);
	}

	@RequestMapping(value = "/{idCandidato}/{idEvento}", method = RequestMethod.PUT)
	public @ResponseBody Evento atualizar(@RequestBody Evento entidade, @PathVariable Long idCandidato, @PathVariable Long idEvento) throws CrudResourceException, CandidatoException {
		return getService().atualizar(entidade, idCandidato);
	}

	@RequestMapping(value = "/{idCandidato}/{idEvento}", method = RequestMethod.DELETE)
	public @ResponseBody void apagar(@RequestBody Evento entidade, @PathVariable Long idCandidato, @PathVariable Long idEvento) throws CrudResourceException, CandidatoException {
		getService().excluir(entidade);
	}

	@RequestMapping(value = "/{idCandidato}", method = RequestMethod.GET)
	public @ResponseBody List<Evento> listarPorCandidato(@PathVariable Long idCandidato) throws CandidatoException, CrudResourceException {
		return getService().listarPorCandidato(idCandidato);
	}
	
	@RequestMapping(value = "/teste", method = RequestMethod.GET)
	public @ResponseBody Evento teste() throws CandidatoException, CrudResourceException {
		return new Evento();
	}

	@RequestMapping(value = "/listarTipos", method = RequestMethod.GET)
	public @ResponseBody List<TipoEvento> listarTipos() throws CrudResourceException {
		return getService().listarTiposEvento();
	}

	/*
	 * GETTERS E SETTERS
	 */
	public EventoService getService() throws CrudResourceException {
		return this.eventoService;
	}
}