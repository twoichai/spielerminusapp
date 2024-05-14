package com.example.spielerminusapp.model.converter;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.AttributeConverter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.util.Map;

public class HashMapConverter implements AttributeConverter<Map<String, Object>, String> {
    private static final Logger LOG = LoggerFactory.getLogger(HashMapConverter.class);
    private final ObjectMapper objectMapper = new ObjectMapper().findAndRegisterModules();

    @Override
    public String convertToDatabaseColumn(Map<String, Object> customerInfo) {

        String mappedRuleJson = null;
        try {
            mappedRuleJson = objectMapper.writeValueAsString(customerInfo);
        } catch (final JsonProcessingException e) {
            LOG.error("JSON writing error", e);
        }

        return mappedRuleJson;
    }

    @Override
    public Map<String, Object> convertToEntityAttribute(String customerInfoJSON) {
        Map<String, Object> mappedRule = null;
        try {
            mappedRule = objectMapper.readValue(customerInfoJSON,
                    new TypeReference<>() {});
        } catch (final IOException e) {
            LOG.error("JSON reading error", e);
        }

        return mappedRule;
    }
}