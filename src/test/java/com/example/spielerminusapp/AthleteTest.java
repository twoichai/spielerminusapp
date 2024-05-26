package com.example.spielerminusapp;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

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
                .andExpect(MockMvcResultMatchers.jsonPath("$.lastName").value("Siegert"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.email").value("markus.siegert@mail.com"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.dob").value("2008-01-26"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.sex").value("M"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.username").value("masi2006"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.password").value("pass4Masi"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.role").value("ATHLETE"));
    }

    @Test
    public void testGetAthletes() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/athletes")
                .contentType(MediaType.APPLICATION_JSON)).andExpect(MockMvcResultMatchers.status().isOk());
    }

}