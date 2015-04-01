package br.unicesumar.resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import br.unicesumar.entity.AlunoAula;
import br.unicesumar.service.AlunoAulaService;

@Controller
@RequestMapping("/rest/alunoaula")
public class AlunoAulaResource extends CrudResourceTemplate<AlunoAula>{
	
	@Autowired
	private AlunoAulaService service;

	public AlunoAulaService getService() {
		return this.service;
	}

}
