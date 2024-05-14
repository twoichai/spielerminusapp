package com.example.spielerminusapp.repository;

import com.example.spielerminusapp.model.CompletedExercise;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CompletedExerciseRepository extends JpaRepository<CompletedExercise, Long> {

    @Query("SELECT ce FROM CompletedExercise ce WHERE ce.athlete.id = :athleteId")
    List<CompletedExercise> findByAthleteId(@Param("athleteId") Long athleteId);
}
