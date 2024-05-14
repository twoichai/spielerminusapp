package com.example.spielerminusapp.model.exercise;

import com.example.spielerminusapp.model.enums.Metric;
import com.example.spielerminusapp.model.exercise.Exercise;
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

    @Column(name = "VALUE")
    private long value;

    @Enumerated(EnumType.STRING)
    @Column(name = "METRIC")
    private Metric metric;

    @Column(name = "LABEL")
    private String label;

    @Column(name = "POINTS")
    private String points;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "EXERCISE_ID")
    private Exercise exercise;
}
