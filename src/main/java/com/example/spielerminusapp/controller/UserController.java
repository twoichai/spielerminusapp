package com.example.spielerminusapp.controller;

import com.example.spielerminusapp.securityconfig.ChangePasswordRequest;
import com.example.spielerminusapp.service.MyUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController

@RequestMapping("/user/details")
public class UserController {

    @Autowired
    private MyUserService myUserService;

    @PatchMapping
    public ResponseEntity<?> changePassword(
            @RequestBody ChangePasswordRequest request,
            Principal connectedUser
    ) {
        /*myUserService.changePassword(request, connectedUser);*/
        return ResponseEntity.ok().build();
    }
}
