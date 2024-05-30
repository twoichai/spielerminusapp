package com.example.spielerminusapp.controller;

import com.example.spielerminusapp.model.Athlete;
import com.example.spielerminusapp.service.AthleteService;
import com.opencsv.bean.StatefulBeanToCsv;
import com.opencsv.bean.StatefulBeanToCsvBuilder;
import com.opencsv.exceptions.CsvDataTypeMismatchException;
import com.opencsv.exceptions.CsvRequiredFieldEmptyException;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.time.Year;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/athletes")
public class AthleteController {

    @Autowired
    private final AthleteService athleteService;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    public AthleteController(AthleteService athleteService) {
        this.athleteService = athleteService;
    }

    // Get all athletes
    @GetMapping
    public List<Athlete> findAllAthletes() {
        return athleteService.findAll();
    }

    // Save a new athlete
    @PostMapping("/register")
    public Athlete saveAthlete(@RequestBody Athlete athlete) {
        athlete.setPassword(passwordEncoder.encode(athlete.getPassword()));
        athlete.setRole("ATHLETE");
        athlete.setUsername(generateUsername(athlete));
        return athleteService.save(athlete);
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

    @GetMapping("/{id}")
    public ResponseEntity<Athlete> getAthleteById(@PathVariable Long id) {
        return athleteService.findById(id)
                .map(ResponseEntity::ok) // If athlete is found, return 200 OK with the athlete
                .orElseGet(() -> ResponseEntity.notFound().build()); // If not found, return 404 Not Found
    }

    @PostMapping(value = "/upload", consumes = {"multipart/form-data"})
    public ResponseEntity<Integer> uploadStudents(
            @RequestPart("file")MultipartFile file
            ) throws IOException {
        return ResponseEntity.ok(athleteService.uploadAthletes(file));
    }

    // Update an existing athlete
   @PutMapping("/update/{id}")
    public ResponseEntity<Athlete> updateAthlete(@PathVariable Long id, @RequestBody Athlete athleteDetails) {
        return athleteService.updateById(id, athleteDetails)
                .map(updatedAthlete -> ResponseEntity.ok().body(updatedAthlete))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Delete an athlete by ID
    @DeleteMapping("delete/{id}")
    public ResponseEntity<Void> deleteAthlete(@PathVariable Long id) {
        athleteService.deleteById(id);
        return ResponseEntity.ok().build();
    }

    // Find athletes by last name
    @GetMapping("/search")
    public List<Athlete> findByLastName(@RequestParam String lastName) {
        return athleteService.findByLastName(lastName);
    }

    @GetMapping("/export")
    public void exportAthletesCSV(HttpServletResponse httpServletResponse) throws CsvDataTypeMismatchException, CsvRequiredFieldEmptyException, IOException {
        String filename ="all-athletes-export.csv";
        httpServletResponse.setContentType("text/csv");
        httpServletResponse.setHeader(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + filename + "");

        StatefulBeanToCsv<Athlete> writer = new StatefulBeanToCsvBuilder<Athlete>(httpServletResponse.getWriter())
                .withSeparator(';')
                .build();

        writer.write(athleteService.findAll());

   }
    @GetMapping("/export/{id}")
    public ResponseEntity<Void> exportAthleteCSVById(@PathVariable Long id, HttpServletResponse httpServletResponse) throws CsvDataTypeMismatchException, CsvRequiredFieldEmptyException, IOException {
        Optional<Athlete> optionalAthlete = athleteService.findById(id);

        if (optionalAthlete.isPresent()) {
            Athlete athlete = optionalAthlete.get();
            String firstName = athlete.getFirstName();
            String lastName = athlete.getLastName();
            String filename = firstName + "-"+ lastName + "-export.csv";
            httpServletResponse.setContentType("text/csv");
            httpServletResponse.setHeader(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + filename + "\"");

            StatefulBeanToCsv<Athlete> writer = new StatefulBeanToCsvBuilder<Athlete>(httpServletResponse.getWriter())
                    .withSeparator(';')
                    .build();

            writer.write(athlete);

            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PatchMapping("/swimming-certificate/{id}/{swimmingCertificate}")
    public Athlete updateSwimmingCertificate(@PathVariable Long id, @PathVariable boolean swimmingCertificate) {
        return athleteService.updateSwimmingCertificate(id, swimmingCertificate);
    }

    @GetMapping("/einzelpruefkarte/{id}/{year}")
    public void exportEinzelpruefkarte(@PathVariable Long id, @PathVariable Year year, HttpServletResponse response) throws IOException {
        // Generate the PDF file
        athleteService.createPruefkartePDF(id, year);

        // Specify the path to the generated PDF file
        String filename = "src/main/resources/pdf/pruefkarte.pdf";
        File file = new File(filename);

        // Set response headers
        response.setContentType("application/pdf");
        response.setHeader(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"pruefkarte.pdf\"");
        response.setContentLength((int) file.length());

        // Write the PDF file to the response output stream
        try (FileInputStream fis = new FileInputStream(file);
             OutputStream os = response.getOutputStream()) {
            byte[] buffer = new byte[4096];
            int bytesRead;
            while ((bytesRead = fis.read(buffer)) != -1) {
                os.write(buffer, 0, bytesRead);
            }
            os.flush();
        }
    }
}