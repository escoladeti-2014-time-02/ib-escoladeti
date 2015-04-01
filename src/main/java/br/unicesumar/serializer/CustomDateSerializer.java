package br.unicesumar.serializer;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;

import br.unicesumar.util.date.DateUtils;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;

public class CustomDateSerializer extends JsonSerializer<Date> {

	@Override
	public void serialize(Date date, JsonGenerator jgen,
			SerializerProvider provider) throws IOException,
			JsonProcessingException {

		jgen.writeString(new SimpleDateFormat(DateUtils.FORMATO_AMERICANO)
				.format(date));
	}
}