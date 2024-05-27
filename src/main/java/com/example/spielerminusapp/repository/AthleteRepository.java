package com.example.spielerminusapp.repository;

import com.example.spielerminusapp.model.Athlete;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AthleteRepository extends JpaRepository<Athlete, Long> {
    List<Athlete> findByLastName(String lastName);
    Optional<Athlete> findByUsername(String username);
    List<Athlete> findByFirstNameAndLastName(String firstName, String lastName);
}
