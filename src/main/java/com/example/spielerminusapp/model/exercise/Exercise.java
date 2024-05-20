package com.example.spielerminusapp.model.exercise;

import com.example.spielerminusapp.model.enums.ExerciseType;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "exercise")
@Data
@Getter
@Setter

public class Exercise {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "EXERCISE_ID")
    private Long id;

    @Column(name = "EXERCISE_TITLE")
    private String title;


    @Enumerated(EnumType.STRING)
    @Column(name = "EXERCISE_TYPE")
    private ExerciseType exerciseType;

    @OneToMany(mappedBy = "exercise", cascade = CascadeType.ALL, fetch = FetchType.EAGER, orphanRemoval = false)
    @JsonManagedReference
    private List<Rule> rule = new ArrayList<>();
}
