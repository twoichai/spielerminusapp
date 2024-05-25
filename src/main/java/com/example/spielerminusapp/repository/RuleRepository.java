package com.example.spielerminusapp.repository;

import com.example.spielerminusapp.model.exercise.Rule;
import com.example.spielerminusapp.model.exercise.RuleGroup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RuleRepository extends JpaRepository<Rule, Long> {
    /*List<Rule> findAllByRuleGroup(RuleGroup ruleGroup);*/
}
