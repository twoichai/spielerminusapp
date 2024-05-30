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
import java.util.*;
import java.util.stream.Collectors;

import com.itextpdf.forms.PdfAcroForm;
import com.itextpdf.forms.fields.PdfFormField;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfReader;
import com.itextpdf.kernel.pdf.PdfWriter;

@Service
public class AthleteService {

    private final AthleteRepository athleteRepository;

    @Autowired
    private  CompletedExerciseService completedExerciseService;
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
                    existingAthlete.setSwimmingCertificate(athleteDetails.isSwimmingCertificate());
                    existingAthlete.setPassword(athleteDetails.getPassword());
                    existingAthlete.setRole("ATHLETE");
                    return athleteRepository.save(existingAthlete);
                });
    }

    public Athlete updateSwimmingCertificate(Long id, boolean swimmingCertificate) {
        Optional<Athlete> athleteOptional = athleteRepository.findById(id);
        if (athleteOptional.isPresent()) {
            Athlete athlete = athleteOptional.get();
            athlete.setSwimmingCertificate(swimmingCertificate);
            return athleteRepository.save(athlete);
        } else {
            throw new RuntimeException("Athlete not found with id: " + id);
        }
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
                DateTimeFormatter.ofPattern("dd.MM.yyyy")
        );

        Set<Athlete> athletes = new HashSet<>();

        try (Reader reader = new BufferedReader(new InputStreamReader(inputStream))) {
            HeaderColumnNameMappingStrategy<AthleteCsvRepresentation> strategy = new HeaderColumnNameMappingStrategy<>();
            strategy.setType(AthleteCsvRepresentation.class);

            CsvToBean<AthleteCsvRepresentation> csvToBean = new CsvToBeanBuilder<AthleteCsvRepresentation>(reader)
                    .withMappingStrategy(strategy)
                    .withIgnoreEmptyLine(true)
                    .withSeparator(';')
                    .withIgnoreLeadingWhiteSpace(true)
                    .build();

            csvToBean.parse()
                    .stream()
                    .forEach(csvLine -> {
                        Athlete athlete = Athlete.builder()
                                .firstName(csvLine.getFirstname())
                                .lastName(csvLine.getLastname())
                                .email(csvLine.getEmail())
                                .dob(parseDate(csvLine.getDob(), formatters))
                                .sex(csvLine.getSex())
                                .swimmingCertificate(false)
                                .role("ATHLETE")
                                .password(passwordEncoder.encode(randomPasswordGenerator.generateRandomPassword(12)))
                                .build();

                        String username = generateUsername(athlete);

                        // Check if the username already exists
                        Optional<Athlete> existingAthleteOptional = athleteRepository.findByUsername(username);
                        if (existingAthleteOptional.isPresent()) {
                            Athlete existingAthlete = existingAthleteOptional.get();
                            // Update only the specified fields
                            existingAthlete.setFirstName(athlete.getFirstName());
                            existingAthlete.setLastName(athlete.getLastName());
                            existingAthlete.setEmail(athlete.getEmail());
                            existingAthlete.setDob(athlete.getDob());
                            existingAthlete.setSex(athlete.getSex());
                            athletes.add(existingAthlete);
                        } else {
                            athlete.setUsername(username);
                            athletes.add(athlete);
                        }
                    });
        }

        return athletes;
    }
    private String generateUsername(Athlete athlete) {
        String firstName = athlete.getFirstName();
        String lastName = athlete.getLastName();
        int birthYear = athlete.getDob().getYear();

        String firstPart = firstName.length() >= 2 ? firstName.substring(0, 2) : firstName;
        String lastPart = lastName.length() >= 2 ? lastName.substring(0, 2) : lastName;
        String yearPart = String.valueOf(birthYear);

        return firstPart.toLowerCase() + lastPart.toLowerCase() + yearPart;
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

    public void createPruefkartePDF(Long athleteId) throws IOException {
        Athlete athlete = athleteRepository.getReferenceById(athleteId);
        String src = "src/main/resources/pdf/DSA_Einzelpruefkarte_2024_FORMULAR_neu.pdf";
        String dest = "src/main/resources/pdf/pruefkarte.pdf";

        String atlerDasErreichtWird = Integer.toString(LocalDate.now().getYear() - athlete.getDob().getYear());

        PdfDocument pdfDoc = new PdfDocument(new PdfReader(src), new PdfWriter(dest));
        PdfAcroForm form = PdfAcroForm.getAcroForm(pdfDoc, true);
        Map<String, PdfFormField> fields = form.getFormFields();
        System.out.println(fields.toString());

        fields.get("Nachname").setValue(athlete.getLastName());
        fields.get("Vorname").setValue(athlete.getFirstName());
        fields.get("TTMMJJJJ").setValue(new StringBuilder(athlete.getDob().format(DateTimeFormatter.ofPattern("ddMMyyyy")).toString()).toString());
        fields.get("Telefon / E-Mail").setValue(athlete.getEmail());
        fields.get("Geschlecht w  m").setValue(athlete.getSex().toLowerCase());
        fields.get("Alter das im Kalenderjahr erreicht wird").setValue(atlerDasErreichtWird);
        fields.get("0").setValue(LocalDate.now().format(DateTimeFormatter.BASIC_ISO_DATE).substring(2,4));//jahr der prüfung
        fields.get("Wert").setValue(completedExerciseService.getCompletedExercisesByAthleteIdAndExerciseId(athlete.getId(), 1L).get(0).getResult().toString());//Laufen
        fields.get("Wert_2").setValue("");//10 km Lauf
        fields.get("Wert_3").setValue(completedExerciseService.getCompletedExercisesByAthleteIdAndExerciseId(athlete.getId(), 2L).get(0).getResult().toString());//Dauergeländelauf
        fields.get("Wert_4").setValue("");//Nordicwalking
        fields.get("Punkte Ausdauer").setValue("");
        fields.get("Wert_5").setValue(completedExerciseService.getCompletedExercisesByAthleteIdAndExerciseId(athlete.getId(), 3L).get(0).getResult().toString());//Schwimmen
        fields.get("Wert_6").setValue(completedExerciseService.getCompletedExercisesByAthleteIdAndExerciseId(athlete.getId(), 4L).get(0).getResult().toString());//Radfahren

        fields.get("Wert_7").setValue(completedExerciseService.getCompletedExercisesByAthleteIdAndExerciseId(athlete.getId(), 5L).get(0).getResult().toString());//Schlagball
        fields.get("Wert_8").setValue("");//Medizinball
        fields.get("Wert_9").setValue(completedExerciseService.getCompletedExercisesByAthleteIdAndExerciseId(athlete.getId(), 6L).get(0).getResult().toString());//Kugelstossen
        fields.get("Wert_10").setValue("");//Steinstossen
        fields.get("Punkte Kraft").setValue("");
        fields.get("Wert_11").setValue(completedExerciseService.getCompletedExercisesByAthleteIdAndExerciseId(athlete.getId(), 7L).get(0).getResult().toString());//standweitsprung
        fields.get("Übung 627").setValue(completedExerciseService.getCompletedExercisesByAthleteIdAndExerciseId(athlete.getId(), 8L).get(0).getResult().toString());//Gerätturnen 6.2.7


        fields.get("Wert_12").setValue(completedExerciseService.getCompletedExercisesByAthleteIdAndExerciseId(athlete.getId(), 9L).get(0).getResult().toString()); //laufen
        fields.get("Wert_13").setValue(completedExerciseService.getCompletedExercisesByAthleteIdAndExerciseId(athlete.getId(), 10L).get(0).getResult().toString()); //schwimmen
        fields.get("Wert_14").setValue(completedExerciseService.getCompletedExercisesByAthleteIdAndExerciseId(athlete.getId(), 11L).get(0).getResult().toString()); //radfahren
        fields.get("Punkte Schnelligkeit").setValue("");
        fields.get("Übung 634").setValue(completedExerciseService.getCompletedExercisesByAthleteIdAndExerciseId(athlete.getId(), 12L).get(0).getResult().toString());//Gerätturnen 6.3.4


        fields.get("Wert_15").setValue(completedExerciseService.getCompletedExercisesByAthleteIdAndExerciseId(athlete.getId(), 13L).get(0).getResult().toString()); //hochsprung
        fields.get("Wert_16").setValue(completedExerciseService.getCompletedExercisesByAthleteIdAndExerciseId(athlete.getId(), 14L).get(0).getResult().toString()); //weitsprung
        fields.get("Wert_17").setValue(completedExerciseService.getCompletedExercisesByAthleteIdAndExerciseId(athlete.getId(), 15L).get(0).getResult().toString()); //zonenweitsprung
        fields.get("Wert_18").setValue(completedExerciseService.getCompletedExercisesByAthleteIdAndExerciseId(athlete.getId(), 16L).get(0).getResult().toString()); //drehwurf
        fields.get("Wert_19").setValue(completedExerciseService.getCompletedExercisesByAthleteIdAndExerciseId(athlete.getId(), 17L).get(0).getResult().toString()); //schleuderball
        fields.get("Punkte Koordination").setValue("");
        fields.get("Ergänzung").setValue(completedExerciseService.getCompletedExercisesByAthleteIdAndExerciseId(athlete.getId(), 19L).get(0).getResult().toString());//Gerätturnen 6.4.7 for some reason called ergänzung :D

        fields.get("Anzahl 2").setValue(completedExerciseService.getCompletedExercisesByAthleteIdAndExerciseId(athlete.getId(), 18L).get(0).getResult().toString()); //seilspringen


        if(athlete.isSwimmingCertificate()) {
            fields.get("Nachweis der Schwimmfertigkeit liegt vor").setValue("Yes");
        } else {
            fields.get("Nachweis der Schwimmfertigkeit liegt vor").setValue("Off");
        }

        fields.get("Ausstellungsdatum").setValue(LocalDate.now().format(DateTimeFormatter.BASIC_ISO_DATE).toString());
        fields.get("Kinder und Jugendliche").setValue("Yes");

        fields.get("GESAMTPUNKTZAHL").setValue("");

        fields.get("Bronze").setValue("Yes");
        fields.get("Silber").setValue("Yes");
        fields.get("Gold").setValue("Yes");

        form.flattenFields();
        pdfDoc.close();
    }
}
