package com.example.spielerminusapp.securityconfig.service;

import com.example.spielerminusapp.model.Admin;
import com.example.spielerminusapp.model.Athlete;
import com.example.spielerminusapp.model.BasicUser;
import com.example.spielerminusapp.repository.AdminRepository;
import com.example.spielerminusapp.repository.AthleteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Objects;
import java.util.Optional;

@Service
public class MyUserService implements UserDetailsService {

    @Autowired
    private AthleteRepository athleteRepository;

    @Autowired
    private AdminRepository adminRepository;

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
}
