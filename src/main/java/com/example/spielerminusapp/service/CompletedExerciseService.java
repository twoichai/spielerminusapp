package com.example.spielerminusapp.service;
import com.example.spielerminusapp.model.csvmodels.CompletedExerciseCsvRepresentation;
import com.example.spielerminusapp.model.exercise.CompletedExercise;

import com.example.spielerminusapp.repository.AthleteRepository;
import com.example.spielerminusapp.repository.CompletedExerciseRepository;
import com.example.spielerminusapp.repository.RuleRepository;
import com.opencsv.bean.CsvToBean;
import com.opencsv.bean.CsvToBeanBuilder;
import com.opencsv.bean.HeaderColumnNameMappingStrategy;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.Reader;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;
import java.util.stream.Stream;

@Service
@RequiredArgsConstructor
public class CompletedExerciseService {

    private final CompletedExerciseRepository completedExerciseRepository;
    private final AthleteRepository athleteRepository;
    private final RuleRepository ruleRepository;
    /**
     * Find all completed exercises.
     * @return a list of all completed exercises
     */
    public List<CompletedExercise> getAllCompletedExercises() {
        return completedExerciseRepository.findAll();
    }

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
     * @return the updated exercise, or an empty Optional if not found*/
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

    /*public Integer uploadCompletedExercises(MultipartFile file) throws IOException {
        Set<CompletedExercise> completedExercises = parseCsv(file);
        completedExerciseRepository.saveAll(completedExercises);
        return completedExercises.size();
    }*/

   /* private Set<CompletedExercise> parseCsv(MultipartFile file) throws IOException {
       return readCsv(file)
               .map(this::convert)
               .flatMap(Optional::stream)
               .collect(Collectors.toSet());
    }*/

   /* private Optional<CompletedExercise> convert(CompletedExerciseCsvRepresentation csvRepresentation) {
        Optional<RuleGroup> ruleGroupMaybe = ruleGroupRepository.findByTitle(csvRepresentation.getExercise());
        Optional<Athlete> athleteMaybe = athleteRepository.findByFirstNameAndLastName(
                csvRepresentation.getFirstName(),
                csvRepresentation.getLastName()
        ).stream().filter(athlete -> athlete.getDob().getYear() == Integer.parseInt(csvRepresentation.getYearOfBirth()))
                .findFirst();

        return Optionals.mapIfAllPresent(ruleGroupMaybe, athleteMaybe, (ruleGroup, athlete) -> {
            List<Rule> rules = ruleRepository.findAllByRuleGroup(ruleGroup);

            // Find matching rules (for all medal types) for user (from what we fetched)
            return null;
        });
    }*/

    private Stream<CompletedExerciseCsvRepresentation> readCsv(MultipartFile file) throws IOException{
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd.MM.yyyy");
        try(Reader reader = new BufferedReader(new InputStreamReader(file.getInputStream()))) {
            HeaderColumnNameMappingStrategy<CompletedExerciseCsvRepresentation> strategy =
                    new HeaderColumnNameMappingStrategy<>();
            strategy.setType(CompletedExerciseCsvRepresentation.class);
            CsvToBean<CompletedExerciseCsvRepresentation> csvToBean =
                    new CsvToBeanBuilder<CompletedExerciseCsvRepresentation>(reader)
                            .withMappingStrategy(strategy)
                            .withIgnoreEmptyLine(true)
                            .withSeparator(';')
                            .withIgnoreLeadingWhiteSpace(true)
                            .build();
            return csvToBean.parse().stream();
        }
    }


}
