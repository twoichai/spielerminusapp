package com.example.spielerminusapp.service;
import com.example.spielerminusapp.model.Athlete;
import com.example.spielerminusapp.model.CompletedExercise;
import com.example.spielerminusapp.repository.CompletedExerciseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class CompletedExerciseService {

    private final CompletedExerciseRepository completedExerciseRepository;

    @Autowired
    public CompletedExerciseService(CompletedExerciseRepository completedExerciseRepository) {
        this.completedExerciseRepository = completedExerciseRepository;
    }
    /**
     * Find all completed exercises.
     * @return a list of all completed exercises
     */
    public List<CompletedExercise> getAllCompletedExercises() {
        return completedExerciseRepository.findAll();
    }
    /**
     * Save or update an exercise.
     * @param completedExercise the exercise to save or update
     * @return the saved or updated exercise
     */

    /**
     * Find an exercise by ID.
     * @param id the ID of the exercise to find
     * @return an Optional containing the found exercise or an empty Optional if no exercise is found
     */
    public Optional<CompletedExercise> findById(Long id) {
        return completedExerciseRepository.findById(id);
    }
    public CompletedExercise save(CompletedExercise completedExercise) {
        return completedExerciseRepository.save(completedExercise);
    }

    /**
     * Update a completed exercise by ID.
     * @param id the ID of the completed exercise to update
     * @param completedExerciseDetails details to update
     * @return the updated exercise, or an empty Optional if not found
     */
    public Optional<CompletedExercise> updateById(Long id, CompletedExercise completedExerciseDetails) {
        return completedExerciseRepository.findById(id)
                .map(existingCompletedExercise -> {
                    existingCompletedExercise.setExercise(completedExerciseDetails.getExercise());
                    existingCompletedExercise.setAthlete(completedExerciseDetails.getAthlete());
                    existingCompletedExercise.setDateOfCompletion(completedExerciseDetails.getDateOfCompletion());
                    existingCompletedExercise.setResult(completedExerciseDetails.getResult());
                    existingCompletedExercise.setPointsEarned(completedExerciseDetails.getPointsEarned());
                    existingCompletedExercise.setMedal(completedExerciseDetails.getMedal());
                    return completedExerciseRepository.save(existingCompletedExercise);
                });
    }

    /**
     * Delete an exercise by ID.
     * @param id the ID of the exercise to be deleted
     */
    public void deleteById(Long id) {
        completedExerciseRepository.deleteById(id);
    }

    public Optional getCompletedExercise(Long id) {
        return completedExerciseRepository.findById(id);
    }

    @Transactional
    public boolean saveCompletedExercise(CompletedExercise completedExercise) {
        return true;
    }

}
