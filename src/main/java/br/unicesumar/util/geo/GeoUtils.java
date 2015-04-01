package br.unicesumar.util.geo;

/**
 * Utilitário para operações geográficas
 * 
 * @author Thiago Galbiatti Vespa
 */
public class GeoUtils {

	/**
	 * Raio médio da terra em quilômetros Ref:
	 * http://en.wikipedia.org/wiki/Earth_radius
	 */
	public static int EARTH_RADIUS_KM = 6371;

	/**
	 * Distância entre dois pontos geográficos. Os valores devem ser informados
	 * em graus.
	 * 
	 * @param firstLatitude
	 *            Latitude do primeiro ponto
	 * @param firstLongitude
	 *            Longitude do primeiro ponto
	 * @param secondLatitude
	 *            Latitude do segundo ponto
	 * @param secondLongitude
	 *            Longitude do segundo ponto
	 * 
	 * @return Distância em quilômetros entre os dois pontos
	 */
	public static double distanceInKm(double firstLatitude,
			double firstLongitude, double secondLatitude, double secondLongitude) {

		// Conversão de graus pra radianos das latitudes
		double firstLatToRad = Math.toRadians(firstLatitude);
		double secondLatToRad = Math.toRadians(secondLatitude);

		// Diferença das longitudes
		double deltaLongitudeInRad = Math.toRadians(secondLongitude
				- firstLongitude);

		// Cálcula distância entre os pontos
		return Math.acos(Math.cos(firstLatToRad) * Math.cos(secondLatToRad)
				* Math.cos(deltaLongitudeInRad) + Math.sin(firstLatToRad)
				* Math.sin(secondLatToRad))
				* EARTH_RADIUS_KM;
	}
}