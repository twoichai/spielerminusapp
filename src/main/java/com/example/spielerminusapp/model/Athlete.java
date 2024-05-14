package com.example.spielerminusapp.model;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.Date;

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

    @Column(name="FIRST_NAME")
    private String firstName;

    @Column(name="LAST_NAME")
    private String lastName;

    @Column(name="EMAIL")
    private String email;

    @Temporal(TemporalType.DATE)
    @Column(name="DOB")
    private LocalDate dob;

    @Column(name="SEX")
    private String sex;

    @Column(name = "USERNAME")
    private String username;

    @Column(name="PASSWORD")
    private String password;

    @Column(name = "ROLE")
    private String role;
}
