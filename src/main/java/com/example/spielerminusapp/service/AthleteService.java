package com.example.spielerminusapp.service;

import com.example.spielerminusapp.model.Athlete;
import com.example.spielerminusapp.model.csvmodels.AthleteCsvRepresentation;
import com.example.spielerminusapp.repository.AthleteRepository;
import com.example.spielerminusapp.securityconfig.RandomPasswordGenerator;
import com.opencsv.bean.CsvToBean;
import com.opencsv.bean.CsvToBeanBuilder;
import com.opencsv.bean.HeaderColumnNameMappingStrategy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class AthleteService {

    private final AthleteRepository athleteRepository;
    private final PasswordEncoder passwordEncoder;
    private final RandomPasswordGenerator randomPasswordGenerator;

    @Autowired
    public AthleteService(AthleteRepository athleteRepository, PasswordEncoder passwordEncoder, RandomPasswordGenerator randomPasswordGenerator) {
        this.athleteRepository = athleteRepository;
        this.passwordEncoder = passwordEncoder;
        this.randomPasswordGenerator = randomPasswordGenerator;
    }
    /**
     * Find all athletes.
     * @return a list of all athletes
     */
    public List<Athlete> findAll() {
        return athleteRepository.findAll();
    }


    /**
     * Find an athlete by ID.
     * @param id the ID of the athlete to find
     * @return an Optional containing the found athlete or an empty Optional if no athlete is found
     */
    public Optional<Athlete> findById(Long id) {
        return athleteRepository.findById(id);
    }

    /**
     * Save or update an athlete.
     * @param athlete the athlete to save or update
     * @return the saved or updated athlete
     */
    public Athlete save(Athlete athlete) {
        return athleteRepository.save(athlete);
    }

    /**
     * Update an athlete by ID.
     * @param id the ID of the athlete to update
     * @param athleteDetails details to update
     * @return the updated athlete, or an empty Optional if not found
     */
    public Optional<Athlete> updateById(Long id, Athlete athleteDetails) {
        return athleteRepository.findById(id)
                .map(existingAthlete -> {
                    existingAthlete.setFirstName(athleteDetails.getFirstName());
                    existingAthlete.setLastName(athleteDetails.getLastName());
                    existingAthlete.setDob(athleteDetails.getDob());
                    existingAthlete.setSex(athleteDetails.getSex());
                    existingAthlete.setEmail(athleteDetails.getEmail());
                    existingAthlete.setPassword(athleteDetails.getPassword());
                    existingAthlete.setRole("ATHLETE");
                    return athleteRepository.save(existingAthlete);
                });
    }
    /**
     * Delete an athlete by ID.
     * @param id the ID of the athlete to be deleted
     */
    public void deleteById(Long id) {
        athleteRepository.deleteById(id);
    }

    /**
     * Find an athlete by last name.
     * @param lastName the last name of the athlete to find
     * @return a list of athletes with the given last name
     */
    public List<Athlete> findByLastName(String lastName) {
        return athleteRepository.findByLastName(lastName);
    }

    public Integer uploadAthletes(MultipartFile file) throws IOException {
        Set<Athlete> athletes = parseCsv(file.getInputStream());
        athleteRepository.saveAll(athletes);
        return athletes.size();
    }

    public Integer uploadAthletesFromResource(String resourceName) {// "classpath:/csv/compl..."
        try (InputStream res = AthleteService.class.getResourceAsStream(resourceName)) {
            return parseCsv(res).size();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    private Set<Athlete> parseCsv(InputStream inputStream) throws IOException {
        List<DateTimeFormatter> formatters = Arrays.asList(
                DateTimeFormatter.ofPattern("dd.MM.yyyy"),
                DateTimeFormatter.ofPattern("yyyy-MM-dd")
        );

        try (Reader reader = new BufferedReader(new InputStreamReader(inputStream))) {
            HeaderColumnNameMappingStrategy<AthleteCsvRepresentation> strategy = new HeaderColumnNameMappingStrategy<>();
            strategy.setType(AthleteCsvRepresentation.class);

            CsvToBean<AthleteCsvRepresentation> csvToBean = new CsvToBeanBuilder<AthleteCsvRepresentation>(reader)
                    .withMappingStrategy(strategy)
                    .withIgnoreEmptyLine(true)
                    .withSeparator(';')
                    .withIgnoreLeadingWhiteSpace(true)
                    .build();

            return csvToBean.parse()
                    .stream()
                    .map(csvLine -> Athlete.builder()
                            .firstName(csvLine.getFirstname())
                            .lastName(csvLine.getLastname())
                            .email(csvLine.getEmail())
                            .dob(parseDate(csvLine.getDob(), formatters))
                            .sex(csvLine.getSex())
                            .role("ATHLETE")
                            .password(passwordEncoder.encode(randomPasswordGenerator.generateRandomPassword(12)))
                            .build()
                    )
                    .collect(Collectors.toSet());
        }
    }

    private LocalDate parseDate(String dateStr, List<DateTimeFormatter> formatters) {
        for (DateTimeFormatter formatter : formatters) {
            try {
                return LocalDate.parse(dateStr, formatter);
            } catch (DateTimeParseException e) {
                // Continue to next formatter
            }
        }
        throw new IllegalArgumentException("Date format not supported: " + dateStr);
    }
}
