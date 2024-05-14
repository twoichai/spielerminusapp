package com.example.spielerminusapp.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "exercise")
@Data
public class Exercise {

    @Id
    @Column(name = "EXERCISE_ID")
    private Long id;

    @Column(name = "EXERCISE_TITLE")
    private String title;

    @OneToMany(mappedBy = "exercise", cascade = CascadeType.ALL, orphanRemoval = false)
    private List<Rule> rules = new ArrayList<Rule>();
}
