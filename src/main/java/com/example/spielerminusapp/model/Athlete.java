package com.example.spielerminusapp.model;


import com.fasterxml.jackson.annotation.JsonFormat;
import com.opencsv.bean.CsvBindByName;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;


@Entity
@Table(name = "ATHLETE")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Athlete implements BasicUser{

    @Id
    @Column(name="ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @CsvBindByName(column="Vorname")
    @Column(name="FIRST_NAME")
    private String firstName;

    @CsvBindByName(column="Nachname")
    @Column(name="LAST_NAME")
    private String lastName;

    @CsvBindByName(column="E-Mail")
    @Column(name="EMAIL")
    private String email;

    @CsvBindByName(column="Geburtsdatum")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern="yyyy-MM-dd")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @Column(name="DOB")
    private LocalDate dob;

    @CsvBindByName(column="Geschlecht")
    @Column(name="SEX")
    private String sex;

    @Column(name = "USERNAME")
    private String username;

    @Column(name="PASSWORD")
    private String password;

    @Column(name = "ROLE")
    private String role;

    @Column(name = "SCHWIMMNACHWEIS")
    private boolean swimmingCertificate;
}
