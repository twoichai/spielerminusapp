package com.example.spielerminusapp.controller;

import com.example.spielerminusapp.model.exercise.Rule;

import com.example.spielerminusapp.model.exercise.UpdateRuleValuesDTO;
import com.example.spielerminusapp.service.RuleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/rules")
public class RuleController {

    @Autowired
    private RuleService ruleService;

    @GetMapping("/{id}")
    public ResponseEntity<Rule> getRuleById(@PathVariable Long id) {
        return ruleService.findById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
    @PutMapping("/update/{id}")
    public Rule updateValues(@PathVariable Long id, @RequestBody UpdateRuleValuesDTO updateValuesDTO) {
        return ruleService.updateById(id, updateValuesDTO);
    }
}
