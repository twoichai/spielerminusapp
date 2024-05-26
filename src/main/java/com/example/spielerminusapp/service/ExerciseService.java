package com.example.spielerminusapp.service;

import com.example.spielerminusapp.model.Athlete;
import com.example.spielerminusapp.model.enums.ExerciseType;
import com.example.spielerminusapp.model.exercise.Exercise;
import com.example.spielerminusapp.model.exercise.Rule;
import com.example.spielerminusapp.repository.AthleteRepository;
import com.example.spielerminusapp.repository.ExerciseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.Period;
import java.util.ArrayList;
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
        List<Exercise> exercises =  exerciseRepository.findExercisesByAgeGenderAndType(gender, age, type);
        exercises = filterExercisesByAgeAndGender(exercises, age, gender);
        return exercises;
    }
    public List<Exercise> getPossibleExercisesByType(ExerciseType type) {
        List<Exercise> exercises =  exerciseRepository.findExercisesByType(type);

        return exercises;
    }

    private List<Exercise> filterExercisesByAgeAndGender(List<Exercise> exercises, int age, String gender) {
        List<Exercise> filteredExercises = new ArrayList<>();

        for (Exercise exercise : exercises) {
            Exercise filteredExercise = new Exercise();
            filteredExercise.setId(exercise.getId());
            filteredExercise.setTitle(exercise.getTitle());
            filteredExercise.setExerciseType(exercise.getExerciseType());

            List<Rule> filteredRules = new ArrayList<>();
            for (Rule rule : exercise.getRule()) {
                if (rule.getFromAge() <= age && rule.getToAge() >= age && rule.getGender().equals(gender)) {
                    // Add only the rules that apply
                    filteredRules.add(rule);
                }
            }

            // Set the filtered rules to the filtered exercise
            filteredExercise.setRule(filteredRules);

            // Add the exercise with filtered rules to the list
            filteredExercises.add(filteredExercise);
        }

        return filteredExercises;
    }


    public List<Exercise> getAllExercises() {
        return exerciseRepository.findAll();
    }

}