package com.example.spielerminusapp.model.exercise;

import com.example.spielerminusapp.model.Athlete;
import com.example.spielerminusapp.model.enums.ExerciseType;
import com.example.spielerminusapp.model.enums.Medal;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

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
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern="yyyy-MM-dd")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate dateOfCompletion;

    @Enumerated(EnumType.STRING)
    @Column(name = "EXERCISE_TYPE")
    private ExerciseType exerciseType;

    @Column(name = "RESULT")
    private String result;

    @Column(name = "EARNED_POINTS")
    private int pointsEarned;

    @Enumerated(EnumType.STRING) // Assuming Medal is an enum
    @Column(name = "MEDAL")
    private Medal medal;

    @Column(name = "DBS")
    private String DBS;
}
