package br.unicesumar.util.string;

public class StringUtils {

	public static class Query {

		public static String addLikeCaracters(String string) {
			return "%" + string + "%";
		}
	}
}