package com.example.spielerminusapp.controller;

import com.example.spielerminusapp.securityconfig.ChangePasswordRequest;
import com.example.spielerminusapp.securityconfig.OTPRequest;
import com.example.spielerminusapp.service.MyUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController

@RequestMapping("/user/user-details")
public class UserController {

    @Autowired
    private MyUserService myUserService;

    @PatchMapping
    public ResponseEntity<?> changePassword(
            @RequestBody ChangePasswordRequest request,
            Principal connectedUser
    ) {
        myUserService.changePassword(request, connectedUser);
        return ResponseEntity.ok().build();
    }

    @PatchMapping("/changepass")
    public ResponseEntity<String> changeOTP(
            @RequestBody OTPRequest request,
            Principal connectedUser
    ) {
        myUserService.changeOTP(request, connectedUser);
        // Return the index path as a plain string within the response body
        return ResponseEntity.ok("/index");
    }

    @GetMapping("isAdminPasswordDefault")
    public boolean isAdminPasswordDefault(){
        return myUserService.isAdminPasswordDefault();
    }

}
