package com.example.spielerminusapp;

import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import com.example.spielerminusapp.model.Athlete;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.fasterxml.jackson.databind.ObjectMapper;

import java.time.LocalDate;

@SpringBootTest
@AutoConfigureMockMvc
public class AthleteTest {

    @Autowired
    private MockMvc mockMvc;


    @Test
    public void testGetAthleteById() throws Exception {
        MvcResult result = mockMvc.perform(get("/athletes/{id}", 1))
                .andExpect(status().isOk())
                .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
                .andReturn();

        String responseBody = result.getResponse().getContentAsString();
        //For Debugging
        System.out.println("Response: " + responseBody);

        // Making the request
        mockMvc.perform(MockMvcRequestBuilders.get("/athletes/{id}", 1)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.id").value(1))
                .andExpect(MockMvcResultMatchers.jsonPath("$.firstName").value("Markus"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.lastName").value("Schmidt"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.email").value("markus.schmidt@mail.com"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.dob").value("2012-01-26"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.sex").value("M"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.username").value("masi2006"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.password").value("pass4Masi"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.role").value("ATHLETE"));
    }

    @Test
    public void testGetAthletes() throws Exception {
        mockMvc.perform(get("/athletes")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].id").value(1))
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].firstName").value("Markus"))
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].lastName").value("Schmidt"))
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].email").value("markus.schmidt@mail.com"))
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].dob").value("2012-01-26"))
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].sex").value("M"))
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].username").value("masi2006"))
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].password").value("pass4Masi"))
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].role").value("ATHLETE"));
    }

    @Test
    public void testGetAthleteByLastName() throws Exception {
        String lastName="Schmidt";
        MvcResult result = mockMvc.perform(get("/athletes/search").param("lastName",lastName))
                .andExpect(status().isOk())
                .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
                .andReturn();

        String responseBody = result.getResponse().getContentAsString();
        //For Debugging
        System.out.println("Response: " + responseBody);

        // Making the request
        mockMvc.perform(MockMvcRequestBuilders.get("/athletes/search").param("lastName",lastName)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].id").value(1))
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].firstName").value("Markus"))
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].lastName").value("Schmidt"))
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].email").value("markus.schmidt@mail.com"))
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].dob").value("2012-01-26"))
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].sex").value("M"))
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].username").value("masi2006"))
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].password").value("$2a$12$EV3sZWrj5yPLP4aswTmSMesBDDSkMdTshpNdQpq6rTYSKPgOLLTmS"))
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].role").value("ATHLETE"));
    }
    @Test
    public void testUpdateAthlete() throws Exception {
        // Create the request body
        Athlete updatedAthlete = new Athlete();
        updatedAthlete.setId(1L);
        updatedAthlete.setFirstName("Markus");
        updatedAthlete.setLastName("Schmidt");
        updatedAthlete.setEmail("markus.schmidt@mail.com");
        updatedAthlete.setDob(LocalDate.of(2012, 1, 26));
        updatedAthlete.setSex("M");
        updatedAthlete.setUsername("masi2006");
        updatedAthlete.setPassword("pass4Masi");
        updatedAthlete.setRole("ATHLETE");

        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());

        String updatedAthleteJson = objectMapper.writeValueAsString(updatedAthlete);

        mockMvc.perform(put("/athletes/update/{id}", 1)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(updatedAthleteJson))
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.id").value(1))
                .andExpect(MockMvcResultMatchers.jsonPath("$.firstName").value("Markus"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.lastName").value("Schmidt"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.email").value("markus.schmidt@mail.com"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.dob").value("2012-01-26"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.sex").value("M"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.username").value("masi2006"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.password").value("pass4Masi"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.role").value("ATHLETE"));




    }

}