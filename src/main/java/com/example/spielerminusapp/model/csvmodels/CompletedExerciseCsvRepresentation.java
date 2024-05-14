package com.example.spielerminusapp.model.csvmodels;

import com.example.spielerminusapp.model.exercise.Exercise;
import com.example.spielerminusapp.model.enums.ExerciseType;
import com.opencsv.bean.CsvBindByName;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
// Name;Vorname;Geschlecht;Geburtsjahr;Geburtstag;Übung;Kategorie;Datum;Ergebnis;Punkte;DBS
@Builder
public class CompletedExerciseCsvRepresentation {

    @CsvBindByName(column="Name")
    private String lastName;
    @CsvBindByName(column="Vorname")
    private String firstName;

    @CsvBindByName(column="Geschlecht")
    private String sex;

    @CsvBindByName(column="Geburtsjahr")
    private String yearOfBirth;

    @CsvBindByName(column="Geburtstag")
    private LocalDate dob;

    @CsvBindByName(column="Übung")
    private Exercise exercise;

    @CsvBindByName(column="Kategorie")
    private ExerciseType exerciseType;

    @CsvBindByName(column="Datum")
    private LocalDate attemptDate;

    @CsvBindByName(column="Ergebnis")
    private String result;

    @CsvBindByName(column="Punkte")
    private int points;

    @CsvBindByName(column="DBS")
    private boolean dbs;
}
