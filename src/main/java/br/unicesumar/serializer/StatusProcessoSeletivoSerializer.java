package br.unicesumar.serializer;

import java.io.IOException;

import br.unicesumar.entity.StatusProcessoSeletivo;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;

public class StatusProcessoSeletivoSerializer extends JsonSerializer<StatusProcessoSeletivo> {

	@Override
	public void serialize(StatusProcessoSeletivo obj, JsonGenerator generator,
			SerializerProvider provider) throws IOException,
			JsonProcessingException {

		generator.writeNumber(obj.getId());
	}
}