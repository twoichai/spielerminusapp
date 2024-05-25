package com.example.spielerminusapp.service;

import com.example.spielerminusapp.model.Admin;
import com.example.spielerminusapp.repository.AdminRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AdminService {

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Transactional
    public boolean changeEmail(Long adminId, String newEmail, String password) {
        Admin admin = adminRepository.findById(adminId)
                .orElseThrow(() -> new IllegalArgumentException("Admin not found"));

        if (passwordEncoder.matches(password, admin.getPassword())) {
            admin.setEmail(newEmail);
            adminRepository.save(admin);
            return true;
        }
        return false;
    }

    @Transactional
    public boolean changePassword(Long adminId, String oldPassword, String newPassword, String newPasswordRepeat) {
        if (!newPassword.equals(newPasswordRepeat)) {
            throw new IllegalArgumentException("New passwords do not match");
        }

        Admin admin = adminRepository.findById(adminId)
                .orElseThrow(() -> new IllegalArgumentException("Admin not found"));

        if (passwordEncoder.matches(oldPassword, admin.getPassword())) {
            admin.setPassword(passwordEncoder.encode(newPassword));
            adminRepository.save(admin);
            return true;
        }
        return false;
    }
}
