package com.example.spielerminusapp.service;

import com.example.spielerminusapp.model.BasicUser;
import com.example.spielerminusapp.repository.AdminRepository;
import com.example.spielerminusapp.repository.AthleteRepository;
import com.example.spielerminusapp.securityconfig.ChangePasswordRequest;
import org.springframework.context.annotation.Lazy;
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

    private final AthleteRepository athleteRepository;
    private final AdminRepository adminRepository;
    private final PasswordEncoder passwordEncoder;

    public MyUserService(AthleteRepository athleteRepository,
                         AdminRepository adminRepository,
                         @Lazy PasswordEncoder passwordEncoder) {
        this.athleteRepository = athleteRepository;
        this.adminRepository = adminRepository;
        this.passwordEncoder = passwordEncoder;
    }
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
        var user = (User) ((UsernamePasswordAuthenticationToken) connectedUser).getPrincipal();


        // check if the two new passwords are the same
        if (!request.getNewPassword().equals(request.getConfirmationPassword())) {
            throw new IllegalStateException("Passwords are not the same");
        }

        var updatedPassword = passwordEncoder.encode(request.getNewPassword());
        adminRepository.findByUsername(user.getUsername())
                .ifPresent(admin -> {
                    checkPassword(request, admin);
                    admin.setPassword(updatedPassword);
                    adminRepository.save(admin);
                });

        athleteRepository.findByUsername(user.getUsername())
                .ifPresent(athlete -> {
                    checkPassword(request, athlete);
                    athlete.setPassword(updatedPassword);
                    athleteRepository.save(athlete);
                });
    }

    private void checkPassword(ChangePasswordRequest request, BasicUser user) {
        // check if the current password is correct
        if (!passwordEncoder.matches(request.getCurrentPassword(), user.getPassword())) {
            throw new IllegalStateException("Wrong password");
        }
    }

    public boolean isAdminPasswordDefault(){
        return adminRepository.findAll().get(0).getPassword().equals("$2a$12$kyaLfBHxYvGNtTJ.ezsaIOe4ibumbOFeAzl9MbFGhDNGI2x1s30xu");
    }
}
