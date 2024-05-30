package com.example.spielerminusapp.service;

import com.example.spielerminusapp.model.Athlete;
import com.example.spielerminusapp.model.enums.ExerciseType;
import com.example.spielerminusapp.model.enums.Medal;
import com.example.spielerminusapp.model.exercise.CompletedExercise;
import com.example.spielerminusapp.model.exercise.Exercise;
import com.example.spielerminusapp.model.exercise.Rule;
import com.example.spielerminusapp.repository.AthleteRepository;
import com.example.spielerminusapp.repository.CompletedExerciseRepository;
import com.example.spielerminusapp.repository.ExerciseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.Period;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
@Service
public class ExerciseService {
    @Autowired
    private ExerciseRepository exerciseRepository;
    @Autowired
    private AthleteRepository athleteRepository;

    @Autowired
    private CompletedExerciseRepository completedExerciseRepository;

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
    public Rule getRuleByExIdAthleteId(Long exerciseId, Long athleteId){
        List<Exercise> exercises = getPossibleExercises(athleteId, exerciseRepository.findById(exerciseId).get().getExerciseType());

        for(Exercise e : exercises){
            if(e.getId() == exerciseId){
                return e.getRule().get(0);
            }
        }
        return null;
    }

    public boolean saveCompletedExercise(Long excerciseId, Long athleteId, String result, LocalDate date) {
        CompletedExercise ex = new CompletedExercise();



        //getting rule for Exercise
        Exercise exercise = exerciseRepository.findById(excerciseId).get();
        Rule rule = getRuleByExIdAthleteId(excerciseId, athleteId);
        Athlete athlete = athleteRepository.findById(athleteId).get();

        //getting Medal values
        long gold = rule.getValueGold();
        long silver = rule.getValueSilver();
        long bronze = rule.getValueBronze();

        ex.setAthlete(athlete);
        ex.setDateOfCompletion(LocalDate.parse(date.format(DateTimeFormatter.ISO_LOCAL_DATE)));
        ex.setDBS("dbs");
        ex.setResult(result);
        ex.setExerciseType(exercise.getExerciseType());
        ex.setExercise(exercise);

        Long resultLong = Long.parseLong(result);

        if (bronze > gold) {
            if (resultLong > bronze) {
                ex.setMedal(Medal.NO_MEDAL);
                ex.setPointsEarned(0);
                completedExerciseRepository.save(ex);
                return true;
            } else if (resultLong > silver) {
                ex.setMedal(Medal.BRONZE);
                ex.setPointsEarned(1);
                completedExerciseRepository.save(ex);
                return true;
            } else if (resultLong > gold) {
                ex.setMedal(Medal.SILBER);
                ex.setPointsEarned(2);
                completedExerciseRepository.save(ex);
                return true;
            } else {
                ex.setMedal(Medal.GOLD);
                ex.setPointsEarned(3);
                completedExerciseRepository.save(ex);
                return true;
            }

        } else {
            if (resultLong < bronze) {
                ex.setMedal(Medal.NO_MEDAL);
                ex.setPointsEarned(0);
                completedExerciseRepository.save(ex);
                return true;
            } else if (resultLong < silver) {
                ex.setMedal(Medal.BRONZE);
                ex.setPointsEarned(1);
                completedExerciseRepository.save(ex);
                return true;
            } else if (resultLong < gold) {
                ex.setMedal(Medal.SILBER);
                ex.setPointsEarned(2);
                completedExerciseRepository.save(ex);
                return true;

            } else {
                ex.setMedal(Medal.GOLD);
                ex.setPointsEarned(3);
                completedExerciseRepository.save(ex);
                return true;
            }
        }

    }



    public List<Exercise> getAllExercises() {
        return exerciseRepository.findAll();
    }

}