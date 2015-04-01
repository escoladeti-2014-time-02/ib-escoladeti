package br.unicesumar.serializer;

import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import br.unicesumar.util.date.DateUtils;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;

public class CustomDateDeserializer extends JsonDeserializer<Date> {

	private Logger LOGGER = LoggerFactory
			.getLogger(CustomDateDeserializer.class);

	@Override
	public Date deserialize(JsonParser jp, DeserializationContext ctxt)
			throws IOException, JsonProcessingException {

		String strData = jp.getValueAsString();

		try {
			return new SimpleDateFormat(DateUtils.FORMATO_AMERICANO)
					.parse(strData);
		} catch (ParseException ex) {
			LOGGER.error("Problemas ao deserializar a data: {}", strData);
		}

		return null;
	}
}