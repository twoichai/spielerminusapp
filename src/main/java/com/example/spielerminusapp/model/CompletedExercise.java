package com.example.spielerminusapp.model;

import com.example.spielerminusapp.model.enums.Medal;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name = "completed_exercises")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CompletedExercise {

    @Id
    @Column(name="ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "EXERCISE_ID")
    private Exercise exercise;

    @ManyToOne
    @JoinColumn(name = "ATHLETE_ID")
    private Athlete athlete;

    @Column(name = "DATE_COMPLETED")
    private LocalDate dateOfCompletion;

    @Column(name = "RESULT")
    private String result;

    @Column(name = "EARNED_POINTS")
    private int pointsEarned;

    @Enumerated(EnumType.STRING) // Assuming Medal is an enum
    @Column(name = "MEDAL")
    private Medal medal;
}
