package com.example.spielerminusapp.controller;

import com.example.spielerminusapp.model.Athlete;
import com.example.spielerminusapp.service.AthleteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

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
        return athleteService.save(athlete);
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
}