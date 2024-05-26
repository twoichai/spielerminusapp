package com.example.spielerminusapp.model.exercise;

import com.example.spielerminusapp.model.enums.Metric;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;


@Entity
@Table(name = "rule")
@Data
public class Rule {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "RULE_ID")
    private Long id;

    @Column(name = "GENDER")
    private String gender;

    @Column(name = "FROM_AGE")
    private int fromAge;

    @Column(name = "TO_AGE")
    private int toAge;

    @Column(name = "VALUE_BRONZE")
    private long valueBronze;
    @Column(name = "VALUE_SILVER")
    private long valueSilver;
    @Column(name = "VALUE_GOLD")
    private long valueGold;

    @Enumerated(EnumType.STRING)
    @Column(name = "METRIC")
    private Metric metric;

    @Column(name = "LABEL")
    private String label;

    @Column(name = "POINTS")
    private String points;

    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "exercise_id")
    private Exercise exercise;

}