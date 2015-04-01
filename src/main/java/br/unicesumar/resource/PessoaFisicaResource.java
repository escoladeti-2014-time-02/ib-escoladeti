package br.unicesumar.resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import br.unicesumar.entity.PessoaFisica;
import br.unicesumar.service.PessoaFisicaService;

@Controller
@RequestMapping("/rest/pessoafisica")
public class PessoaFisicaResource {
		
	@Autowired
	private PessoaFisicaService service;

	@RequestMapping(value = "/findbycpf/{cpf}", method = RequestMethod.GET)
	public @ResponseBody PessoaFisica findByCpf(@PathVariable String cpf) {
		return service.findByCpf(cpf);
	}
}