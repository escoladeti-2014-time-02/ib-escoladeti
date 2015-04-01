package br.unicesumar.controller;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class HomeController {

	@RequestMapping(value= {"/private", "/"}, method = {RequestMethod.GET})
    public ModelAndView login() {
        return new ModelAndView("private/index");
    }

	@RequestMapping(value = "/rest/user", method = RequestMethod.GET)
	public @ResponseBody Object getUser() {
		
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		
		return authentication.getPrincipal();
	}
}