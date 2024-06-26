package com.example.spielerminusapp.repository;

import com.example.spielerminusapp.model.enums.ExerciseType;
import com.example.spielerminusapp.model.exercise.Exercise;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ExerciseRepository extends JpaRepository<Exercise, Long> {
    @Query("SELECT e FROM Exercise e JOIN Rule r ON e.id = r.exercise.id WHERE r.gender = :gender AND r.fromAge <= :age AND r.toAge >= :age AND e.exerciseType = :type")
    List<Exercise> findExercisesByAgeGenderAndType(String gender, int age, ExerciseType type);
    @Query("SELECT e FROM Exercise e JOIN Rule r ON e.id = r.exercise.id WHERE e.exerciseType = :type")
    List<Exercise> findExercisesByType( ExerciseType type);
}
