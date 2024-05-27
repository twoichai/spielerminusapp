package com.example.spielerminusapp.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "admin")
@Data
public class Admin implements BasicUser{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Long id;

    @Column(name = "USERNAME")
    private String username;

    @Column(name = "PASSWORD")
    private String password;

    @Column(name = "EMAIL")
    private String email;

    @Column(name = "ROLE")
    private String role;

    /*@Column(name = "NEED_OTP")
    private boolean needOtp;*/
}
// Default log in data;
// password: admin