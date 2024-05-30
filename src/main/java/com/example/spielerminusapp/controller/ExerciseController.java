package com.example.spielerminusapp.controller;

import com.example.spielerminusapp.model.enums.ExerciseType;
import com.example.spielerminusapp.model.enums.Metric;
import com.example.spielerminusapp.model.exercise.Exercise;
import com.example.spielerminusapp.model.exercise.Rule;
import com.example.spielerminusapp.service.ExerciseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/athletes")
public class ExerciseController {
    @Autowired
    private ExerciseService exerciseService;

    @GetMapping("/exercise/{athleteId}")
    public ResponseEntity<List<Exercise>> getPossibleExercises(@PathVariable Long athleteId, @RequestParam ExerciseType type) {
        List<Exercise> exercises = exerciseService.getPossibleExercises(athleteId, type);
        return ResponseEntity.ok(exercises);
    }

    @GetMapping("/exercisebytype/")
    public ResponseEntity<List<Exercise>> getPossibleExercisesByType(@RequestParam ExerciseType type) {
        List<Exercise> exercises = exerciseService.getPossibleExercisesByType(type);
        return ResponseEntity.ok(exercises);
    }

    @GetMapping("/exercises")
    public ResponseEntity<List<Exercise>> getAllExercises() {
        List<Exercise> exercises = exerciseService.getAllExercises();
        return ResponseEntity.ok(exercises);
    }

    @GetMapping("/exercises/ruleMetricByExIdAthId")
    public ResponseEntity<Metric> getRuleMetricByExIdAthId(@RequestParam Long athleteId, @RequestParam Long exerciseId){
        return ResponseEntity.ok(exerciseService.getRuleByExIdAthleteId(exerciseId, athleteId).getMetric());
    }

    @PostMapping("exercises/saveCompletedExercise/{exerciseId}/{athleteId}/{result}/{date}")
    public ResponseEntity<Void> saveCompletedExercise(@PathVariable Long exerciseId, @PathVariable Long athleteId,
                                                      @PathVariable String result, @PathVariable LocalDate date){
        exerciseService.saveCompletedExercise(exerciseId, athleteId,result, date);
        return ResponseEntity.ok().build();
    }


}
// TODO: import with CSV of (Exercises)/Completed Exercises
// TODO: Controller for Exercises
