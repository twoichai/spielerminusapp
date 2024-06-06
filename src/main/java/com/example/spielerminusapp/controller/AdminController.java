package com.example.spielerminusapp.controller;

import com.example.spielerminusapp.model.Admin;
import com.example.spielerminusapp.repository.AdminRepository;
import com.example.spielerminusapp.service.AdminService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @Autowired
    private AdminRepository adminRepository; // Assuming you have an AdminRepository
    @Autowired
    private PasswordEncoder passwordEncoder;

    @PutMapping("/{adminId}/")
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

        // Check if the provided password is correct using bcrypt
        if (!passwordEncoder.matches(password, admin.getPassword())) {
            return ResponseEntity.badRequest().body("Incorrect password.");
        }

        // Update the admin's email to the newEmail
        admin.setEmail(newEmail);
        adminRepository.save(admin);

        return ResponseEntity.ok("Email updated successfully.");
    }

    @Transactional
    public boolean changeEmail(Long adminId, String newEmail, String password) {
        Admin admin = adminRepository.findById(adminId)
                .orElseThrow(() -> new IllegalArgumentException("Admin not found"));

        // Check if the provided password is correct using bcrypt
        if (passwordEncoder.matches(password, admin.getPassword())) {
            admin.setEmail(newEmail);
            adminRepository.save(admin);
            return true;
        }
        return false;
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
