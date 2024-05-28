package com.example.spielerminusapp.service;

import com.example.spielerminusapp.model.exercise.Rule;
import com.example.spielerminusapp.model.exercise.UpdateRuleValuesDTO;
import com.example.spielerminusapp.repository.RuleRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@AllArgsConstructor
@Service
public class RuleService {

    private final RuleRepository ruleRepository;

    public Optional<Rule> findById(Long id) {
        return ruleRepository.findById(id);
    }

    public Rule updateById(Long id, UpdateRuleValuesDTO updateValuesDTO) {
        Rule rule = ruleRepository.findById(id).orElseThrow(() -> new RuntimeException("Rule not found"));

        if (updateValuesDTO.getValueGold() != null) {
            rule.setValueGold(updateValuesDTO.getValueGold());
        }
        if (updateValuesDTO.getValueSilver() != null) {
            rule.setValueSilver(updateValuesDTO.getValueSilver());
        }
        if (updateValuesDTO.getValueBronze() != null) {
            rule.setValueBronze(updateValuesDTO.getValueBronze());
        }

        return ruleRepository.save(rule);
    }
}
