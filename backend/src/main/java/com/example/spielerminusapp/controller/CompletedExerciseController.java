package com.example.spielerminusapp.controller;

import com.example.spielerminusapp.model.exercise.CompletedExercise;
import com.example.spielerminusapp.service.CompletedExerciseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/completedExercises")
public class CompletedExerciseController {

    private final CompletedExerciseService completedExerciseService;

    @Autowired
    public CompletedExerciseController(CompletedExerciseService completedExerciseService) {
        this.completedExerciseService = completedExerciseService;
    }

    // GET endpoint to retrieve all completed exercises
    @GetMapping
    public ResponseEntity<List<CompletedExercise>> getAllCompletedExercises() {
        List<CompletedExercise> exercises = completedExerciseService.getAllCompletedExercises();
        return ResponseEntity.ok(exercises);
    }

    // GET endpoint to retrieve a single completed exercise by ID
    @GetMapping("/{id}")
    public ResponseEntity<CompletedExercise> getCompletedExerciseById(@PathVariable Long id) {
        Optional<CompletedExercise> completedExercise = completedExerciseService.findById(id);
        return completedExercise.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // POST endpoint to create a new completed exercise
    @PostMapping
    public ResponseEntity<CompletedExercise> createCompletedExercise(@RequestBody CompletedExercise completedExercise) {
        CompletedExercise savedExercise = completedExerciseService.save(completedExercise);
        return ResponseEntity.ok(savedExercise);
    }

    // PATCH endpoint to update a completed exercise by ID
    @PatchMapping("/{id}")
    public ResponseEntity<CompletedExercise> updateCompletedExercise(@PathVariable Long id, @RequestBody CompletedExercise completedExerciseDetails) {
        Optional<CompletedExercise> updatedExercise = completedExerciseService.updateById(id, completedExerciseDetails);
        return updatedExercise.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // DELETE endpoint to remove a completed exercise by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCompletedExercise(@PathVariable Long id) {
        try {
            completedExerciseService.deleteById(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
    @PostMapping(value = "/upload", consumes = {"multipart/form-data"})
    public ResponseEntity<Integer> uploadStudents(
            @RequestPart("file") MultipartFile file
    ) throws IOException {
        return ResponseEntity.ok(completedExerciseService.uploadCompletedExercises(file));
    }
}
