package br.unicesumar.util.date;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;

public class DateUtils {

	public static final String FORMATO_AMERICANO = "yyyy-MM-dd";
	public static final String PRIMEIRA_DATA_DEFAULT = "1500-01-01";
	public static final String FORMATO_BR = "dd-MM-yyy";

	public static String formatar(Date data) {
		return new SimpleDateFormat(FORMATO_BR).format(data);
	}
	public static Date primeiraDataDefault() {
		try {
			return new SimpleDateFormat(FORMATO_AMERICANO)
					.parse(PRIMEIRA_DATA_DEFAULT);
		} catch (ParseException e) {
			return new Date();
		}
	}

	public static Date getDataAniversarioByIdade(Integer idade) {
		GregorianCalendar gc = new GregorianCalendar();

		gc.add(Calendar.YEAR, idade * -1);
		return gc.getTime();
	}
}