package com.example.spielerminusapp.model.csvmodels;

import com.example.spielerminusapp.model.exercise.Exercise;
import com.example.spielerminusapp.model.enums.ExerciseType;
import com.opencsv.bean.CsvBindByName;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
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
    private String dob;

    @CsvBindByName(column="Übung")
    private String exercise;

    @CsvBindByName(column="Kategorie")
    private String exerciseType;

    @CsvBindByName(column="Datum")
    private String attemptDate;

    @CsvBindByName(column="Ergebnis")
    private String result;

    @CsvBindByName(column="Punkte")
    private String points;

    @CsvBindByName(column="DBS")
    private String dbs;
}
