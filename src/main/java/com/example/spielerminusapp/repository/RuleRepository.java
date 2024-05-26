package com.example.spielerminusapp.repository;

import com.example.spielerminusapp.model.exercise.Rule;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;



@Repository
public interface RuleRepository extends JpaRepository<Rule, Long> {

}
