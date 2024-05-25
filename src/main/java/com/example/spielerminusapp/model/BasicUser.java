package com.example.spielerminusapp.model;

public interface BasicUser {
    String getUsername();
    String getPassword();
    String getRole();
    void setPassword(String password);
}
