package br.unicesumar.service;

import org.springframework.stereotype.Component;

import br.unicesumar.resource.ICrudResource;

@Component
public interface ICrudService<T> extends ICrudResource<T> {
}