package com.example.spielerminusapp.controller;

import com.example.spielerminusapp.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @PutMapping("/{adminId}/change-email")
    public ResponseEntity<?> changeEmail(@PathVariable Long adminId,
                                         @RequestParam String newEmail,
                                         @RequestParam String password) {
        boolean success = adminService.changeEmail(adminId, newEmail, password);
        if (success) {
            return ResponseEntity.ok("Email updated successfully.");
        }
        return ResponseEntity.badRequest().body("Failed to update email. Incorrect password.");
    }

    @PutMapping("/{adminId}/change-password")
    public ResponseEntity<?> changePassword(@PathVariable Long adminId,
                                            @RequestParam String oldPassword,
                                            @RequestParam String newPassword,
                                            @RequestParam String newPasswordRepeat) {
        try {
            boolean success = adminService.changePassword(adminId, oldPassword, newPassword, newPasswordRepeat);
            if (success) {
                return ResponseEntity.ok("Password updated successfully.");
            }
            return ResponseEntity.badRequest().body("Failed to update password. Incorrect old password.");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
