package com.example.spielerminusapp.model.exercise;

import jakarta.persistence.*;

@Entity
public class RuleGroup {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    @OneToOne
    @JoinColumn(name = "RULE_ID")
    private Rule rule;

}
