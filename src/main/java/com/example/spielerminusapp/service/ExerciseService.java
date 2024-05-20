package com.example.spielerminusapp.service;

import com.example.spielerminusapp.model.Athlete;
import com.example.spielerminusapp.model.enums.ExerciseType;
import com.example.spielerminusapp.model.exercise.Exercise;
import com.example.spielerminusapp.repository.AthleteRepository;
import com.example.spielerminusapp.repository.ExerciseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.Period;
import java.util.List;

@Service
public class ExerciseService {
    @Autowired
    private ExerciseRepository exerciseRepository;
    @Autowired
    private AthleteRepository athleteRepository;

    public List<Exercise> getPossibleExercises(Long athleteId, ExerciseType type) {
        Athlete athlete = athleteRepository.findById(athleteId).orElseThrow(() -> new RuntimeException("Athlete not found"));
        int age = Period.between(athlete.getDob(), LocalDate.now()).getYears();
        String gender = athlete.getSex();
        return exerciseRepository.findExercisesByAgeGenderAndType(gender, age, type);
    }

    public List<Exercise> getAllExercises() {
        return exerciseRepository.findAll();
    }

}