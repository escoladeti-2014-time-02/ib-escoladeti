package br.unicesumar.entity;

import javax.persistence.Entity;
import javax.validation.constraints.NotNull;

@Entity
public class GeoLocalizacao extends EntidadeBase{

	private static final long serialVersionUID = 1L;

	@NotNull
    private double longitude;

	@NotNull
	private double latitude;
	
    public GeoLocalizacao() {
    }

    /*
     * GETTERS E SETTERS
     * */
    public double getLongitude() {
        return longitude;
    }

    public void setLongitude(double longitude) {
        this.longitude = longitude;
    }
    
    public double getLatitude() {
        return latitude;
    }

    public void setLatitude(double latitude) {
        this.latitude = latitude;
    }

}
