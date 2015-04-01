package br.unicesumar.entity;

import java.io.Serializable;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;
import javax.persistence.SequenceGenerator;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

/**
 * @author Eduardo
 */
@MappedSuperclass
@JsonIgnoreProperties(ignoreUnknown = true)
public class EntidadeBase implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = -2762383699243844181L;

	@Id
    @SequenceGenerator(name = "hibernate_sequence", sequenceName = "hibernate_sequence")
    @GeneratedValue(generator = "hibernate_sequence", strategy = GenerationType.SEQUENCE)
    private Long id;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}