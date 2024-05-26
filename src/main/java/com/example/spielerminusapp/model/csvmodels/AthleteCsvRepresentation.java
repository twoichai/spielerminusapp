package com.example.spielerminusapp.model.csvmodels;

import com.opencsv.bean.CsvBindByName;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AthleteCsvRepresentation {

    @CsvBindByName(column="Vorname")
    private String firstname;

    @CsvBindByName(column="Nachname")
    private String lastname;

    @CsvBindByName(column="E-Mail")
    private String email;

    @CsvBindByName(column="Geburtsdatum")
    private String dob;

    @CsvBindByName(column="Geschlecht")
    private String sex;
}
