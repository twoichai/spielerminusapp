package com.example.spielerminusapp.repository;


import com.example.spielerminusapp.model.exercise.RuleGroup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository
public interface RuleGroupRepository extends JpaRepository<RuleGroup, Long> {
    Optional<RuleGroup> findByTitle(String title);
}
