package br.unicesumar.resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import br.unicesumar.entity.Documento;
import br.unicesumar.exception.CrudResourceException;
import br.unicesumar.service.DocumentoService;

@Controller
@RequestMapping("/rest/documento")
public class DocumentoResource extends CrudResourceTemplate<Documento> {

	@Autowired
	private DocumentoService docService;

	@Override
	public DocumentoService getService() throws CrudResourceException {
		return docService;
	}
	
}