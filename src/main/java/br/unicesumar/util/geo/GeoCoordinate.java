package br.unicesumar.util.geo;


/**
 * Bean para manipulação de coordenadas geográficas
 *
 */
public abstract class GeoCoordinate {
	/**
	 * Latitude em graus
	 */
	private double latitude;
	/**
	 * Longitude em graus
	 */
	private double longitude;

	/**
	 * Construtor com latitude e longitude em graus
	 * 
	 * @param latitude Latitude em graus
	 * @param longitude Longitude em graus
	 */
	public GeoCoordinate(double latitude, double longitude) {
		super();
		this.latitude = latitude;
		this.longitude = longitude;
	}

	/**
	 * Recupera a latitude
	 * @return Latitude em graus
	 */
	public double getLatitude() {
		return latitude;
	}

	/**
	 * Atribui uma latitude
	 * @param latitude Latitude em graus
	 */
	public void setLatitude(double latitude) {
		this.latitude = latitude;
	}

	/**
	 * Recupera uma longitude
	 * @return Longitude em graus
	 */
	public double getLongitude() {
		return longitude;
	}

	/**
	 * Atribui uma longitude
	 * @param longitude Longitude em graus
	 */
	public void setLongitude(double longitude) {
		this.longitude = longitude;
	}

	/**
	 * Distância em Quilômetros de uma coordenada para a atual
	 * @param coordinate coordenada a ser calcula a distância
	 * @return Distância entre as duas coordenadas
	 */
	public double distanceInKm(GeoCoordinate coordinate) {
		return GeoUtils.distanceInKm(this.latitude, this.longitude,
				coordinate.getLatitude(), coordinate.getLongitude());
	}
}

