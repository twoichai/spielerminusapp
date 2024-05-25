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

}
