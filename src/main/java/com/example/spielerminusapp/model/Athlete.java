package com.example.spielerminusapp.model;


import com.fasterxml.jackson.annotation.JsonFormat;
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

    @Column(name="FIRST_NAME")
    private String firstName;

    @Column(name="LAST_NAME")
    private String lastName;

    @Column(name="EMAIL")
    private String email;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern="yyyy-MM-dd")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    //@Temporal(TemporalType.DATE)
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