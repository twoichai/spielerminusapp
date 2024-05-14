package com.example.spielerminusapp.service;
import com.example.spielerminusapp.model.Athlete;
import com.example.spielerminusapp.model.csvmodels.AthleteCsvRepresentation;
import com.example.spielerminusapp.model.csvmodels.CompletedExerciseCsvRepresentation;
import com.example.spielerminusapp.model.exercise.CompletedExercise;
import com.example.spielerminusapp.repository.CompletedExerciseRepository;
import com.opencsv.bean.CsvToBean;
import com.opencsv.bean.CsvToBeanBuilder;
import com.opencsv.bean.HeaderColumnNameMappingStrategy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.Reader;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

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

    public Integer uploadCompletedExercises(MultipartFile file) throws IOException {
        Set<CompletedExercise> completedExercises = parseCsv(file);
        completedExerciseRepository.saveAll(completedExercises);
        return completedExercises.size();
    }
    private Set<CompletedExercise> parseCsv(MultipartFile file) throws IOException {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd.MM.yyyy");
        try(Reader reader = new BufferedReader(new InputStreamReader(file.getInputStream()))) {
            HeaderColumnNameMappingStrategy<CompletedExerciseCsvRepresentation> strategy =
                    new HeaderColumnNameMappingStrategy<>();
            CsvToBean<CompletedExerciseCsvRepresentation> csvToBean =
                    new CsvToBeanBuilder<CompletedExerciseCsvRepresentation>(reader)
                            .withMappingStrategy(strategy)
                            .withIgnoreEmptyLine(true)
                            .withSeparator(';')
                            .withIgnoreLeadingWhiteSpace(true)
                            .build();

            return csvToBean.parse()
                    .stream()
                    .map(csvLine -> CompletedExercise.builder()
                            // Name;
                            // Vorname;
                            // Geschlecht;
                            // Geburtsjahr;
                            // Geburtstag;
                            // Übung;
                            //.exerciseType
                            .dateOfCompletion(csvLine.getAttemptDate())
                            .result(csvLine.getResult())
                            .pointsEarned(99999 /*Need to implement a method to count points*/)
                            .DBS("NEIN")
                            .build()
                    )
                    .collect(Collectors.toSet());
        }
    }

}
