package com.example.spielerminusapp.model;

import com.example.spielerminusapp.model.converter.HashMapConverter;
import jakarta.persistence.*;
import lombok.Data;

import java.util.Map;



@Entity
@Table(name = "rule")
@Data
public class Rule {

    @Id
    @Column(name = "RULE_ID")
    private Long id;

    @Column(name = "GENDER")
    private String gender;

    @Column(name = "FROM_AGE")
    private int fromAge;

    @Column(name = "TO_AGE")
    private int toAge;

    @Column(name = "LABELS")
    private String labels; // 200 m, 10kg - non-important stuff

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "EXERCISE_ID")
    private Exercise exercise;
}
