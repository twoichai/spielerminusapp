package com.example.spielerminusapp.model.csvmodels;

import com.opencsv.bean.CsvBindByName;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AthleteCsvRepresentation {

    @CsvBindByName(column="VORNAME")
    private String firstname;

    @CsvBindByName(column="NACHNAME")
    private String lastname;

    @CsvBindByName(column="E-MAIL")
    private String email;

    @CsvBindByName(column="GEBURTSDATUM")
    private String dob;

    @CsvBindByName(column="GESCHLECHT")
    private String sex;
}
