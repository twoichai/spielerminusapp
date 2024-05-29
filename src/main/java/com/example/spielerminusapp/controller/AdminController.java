package com.example.spielerminusapp.controller;

import com.example.spielerminusapp.model.Admin;
import com.example.spielerminusapp.repository.AdminRepository;
import com.example.spielerminusapp.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @Autowired
    private AdminRepository adminRepository; // Assuming you have an AdminRepository

    @PutMapping("/{adminId}/change-email")
    public ResponseEntity<?> changeEmail(@PathVariable Long adminId,
                                         @RequestParam String oldEmail,
                                         @RequestParam String newEmail,
                                         @RequestParam String password) {
        // Retrieve the admin by adminId
        Optional<Admin> adminOptional = adminRepository.findById(adminId);
        if (!adminOptional.isPresent()) {
            return ResponseEntity.badRequest().body("Admin not found.");
        }

        Admin admin = adminOptional.get();

        // Check if the provided oldEmail matches the admin's current email
        if (!admin.getEmail().equals(oldEmail)) {
            return ResponseEntity.badRequest().body("Old email does not match.");
        }

        // Check if the provided password is correct
        if (!admin.getPassword().equals(password)) { // Assuming plain text password comparison for simplicity
            // In a real application, you should hash the password and compare hashes
            return ResponseEntity.badRequest().body("Incorrect password.");
        }

        // Update the admin's email to the newEmail
        admin.setEmail(newEmail);
        adminRepository.save(admin);

        return ResponseEntity.ok("Email updated successfully.");
    }

   /* @PutMapping("/{adminId}/change-password")
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
    }*/
}
