package com.example.spielerminusapp.model.exercise;

import jakarta.persistence.*;

import java.util.Set;

@Entity
public class RuleGroup {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @OneToMany
    private Set<Rule> rules;

    @ManyToOne
    @JoinColumn(name = "exercise_id")
    private Exercise exercise;
}
