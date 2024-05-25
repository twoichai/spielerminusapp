package com.example.spielerminusapp.securityconfig.service;

import com.example.spielerminusapp.model.Admin;
import com.example.spielerminusapp.model.Athlete;
import com.example.spielerminusapp.model.BasicUser;
import com.example.spielerminusapp.repository.AdminRepository;
import com.example.spielerminusapp.repository.AthleteRepository;
import com.example.spielerminusapp.securityconfig.ChangePasswordRequest;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.Objects;

@Service
public class MyUserService implements UserDetailsService {

    @Autowired
    private AthleteRepository athleteRepository;
    @Autowired
    private AdminRepository adminRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return adminRepository.findByUsername(username)
                .map(BasicUser.class::cast)
                .or(() -> athleteRepository.findByUsername(username))
                .map(basicUser -> User.builder()
                        .username(basicUser.getUsername())
                        .password(basicUser.getPassword())
                        .roles(getRoles(basicUser))
                        .build())
                .orElseThrow(() -> new UsernameNotFoundException(username));
    }

    private String[] getRoles(BasicUser basicUser) {
        return Objects.isNull(basicUser.getRole())
                ? new String[0]
                : new String[]{basicUser.getRole()};
    }

    public void changePassword(ChangePasswordRequest request, Principal connectedUser){

        var basicUser = (BasicUser) ((UsernamePasswordAuthenticationToken) connectedUser).getPrincipal();
        String role = basicUser.getRole();
        // check if the current password is correct
        if (!passwordEncoder.matches(request.getCurrentPassword(), basicUser.getPassword())) {
            throw new IllegalStateException("Wrong password");
        }
        // check if the two new passwords are the same
        if (!request.getNewPassword().equals(request.getConfirmationPassword())) {
            throw new IllegalStateException("Passwords are not the same");
        }
        // update the password
        basicUser.setPassword(passwordEncoder.encode(request.getNewPassword()));

        if (basicUser instanceof Admin adminUser){
            adminRepository.save(adminUser);
        }
        if (basicUser instanceof Athlete athleteUser){
            athleteRepository.save(athleteUser);
        }
    }
}
