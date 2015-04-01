package br.unicesumar.controller;

import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class LoginController {

    @RequestMapping(value="/login", method = {RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE, RequestMethod.PUT})
    @Transactional
    public ModelAndView login() {
        return new ModelAndView("public/login");
    }

    @RequestMapping(value="/login-error")
    public String loginError(Model model) {
        model.addAttribute("loginError", true);
        return "public/login";
    }

    @RequestMapping(value="/logout")
    public String logout(Model model) {
    	model.addAttribute("logoutSuccess", true);
        return "redirect:/j_spring_security_logout";
    }
}