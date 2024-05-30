package com.example.spielerminusapp.repository;

import com.example.spielerminusapp.model.enums.ExerciseType;
import com.example.spielerminusapp.model.exercise.CompletedExercise;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CompletedExerciseRepository extends JpaRepository<CompletedExercise, Long> {

    @Query("SELECT ce FROM CompletedExercise ce WHERE ce.athlete.id = :athleteId")
    List<CompletedExercise> findByAthleteId(@Param("athleteId") Long athleteId);

    @Query("SELECT ce FROM CompletedExercise ce WHERE ce.athlete.id = :athleteId AND ce.exercise.id = :exerciseId ORDER BY ce.dateOfCompletion DESC")
    List<CompletedExercise> findByAthleteIdAndExerciseIdOrderByDateOfCompletionDesc(@Param("athleteId") Long athleteId, @Param("exerciseId") Long exerciseId);

    @Query("SELECT ce FROM CompletedExercise ce WHERE ce.athlete.id = :athleteId AND ce.exerciseType = :type")
    List<CompletedExercise> findByAthleteIdAndExerciseType(@Param("athleteId") Long athleteId, @Param("type")ExerciseType type);
}
