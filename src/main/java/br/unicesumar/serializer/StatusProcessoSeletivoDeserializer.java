package br.unicesumar.serializer;

import java.io.IOException;

import br.unicesumar.entity.StatusProcessoSeletivo;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;

public class StatusProcessoSeletivoDeserializer extends JsonDeserializer<StatusProcessoSeletivo> {

	@Override
	public StatusProcessoSeletivo deserialize(JsonParser parser, DeserializationContext context) throws IOException, JsonProcessingException {
		Integer node = parser.getIntValue();
		return StatusProcessoSeletivo.get(node);
	}
}