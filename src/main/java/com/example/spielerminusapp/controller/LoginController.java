package com.example.spielerminusapp.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class LoginController {

    @GetMapping("/login")
    public String handleLogin() {
        return "custom_login";
    }

    @GetMapping("/home")
    public String handleWelcome() {
        return "index.html";
    }

    @GetMapping("/admin/home")
    public String handleAdminHome() {
        return "admin_home";
    }

    @GetMapping("/athlete/home")
    public String handleAthleteHome() {
        return "athlete_home";
    }

    @GetMapping("/changepass")
    public String changePassword() {
        return "change_password";
    }

    @GetMapping("/adminarea")
    public String adminDetails() {
        return "admin_details";
    }
    @GetMapping("/userdocu")
    public String userDocumentation() {
        return "user_documentation";
    }

}