package com.example.spielerminusapp;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;


@SpringBootTest
@WebMvcTest
class AthleteTest {


    @Test
    void contextLoads() {
    }
    
    @Test
    public void testEchoEndpoint() throws Exception {
        mockMvc.perform(get("/athletes")
                .content("Hello, Echo!")
                .contentType(MediaType.TEXT_PLAIN))
                .andExpect(status().isOk())
                .andExpect(content().string("Hello, Echo!"));
    }
    @Test
    public void getAllAthletesTest() throws Exception {
        mockMvc.perform(get("/athletes")
                .andExpect(status().isOk());
    }
    @Test
    public void createNewAthleteTest() throws Exception {
        String expectedJson = "{"
            + "\"firstName\": \"John\","
            + "\"lastName\": \"Doe\","
            + "\"email\": \"john.doe@example.com\","
            + "\"dob\": \"1990-01-01\","
            + "\"sex\": \"M\","
            + "\"username\": \"johndoe\","
            + "\"password\": \"securepassword123\""
            + "}";

        mockMvc.perform(post("/athletes/a")
                .content(expectedJson)
                .contentType(MediaType.TEXT_PLAIN))
                .andExpect(status().isOk());
    }
    @Test
    public void getAthletebyIDTest() throws Exception {
        String expectedJson = "{"
            + "\"firstName\": \"John\","
            + "\"lastName\": \"Doe\","
            + "\"email\": \"john.doe@example.com\","
            + "\"dob\": \"1990-01-01\","
            + "\"sex\": \"Male\","
            + "\"username\": \"johndoe\","
            + "\"password\": \"securepassword123\","
            + "\"role\": \"USER\""
            + "}";
        mockMvc.perform(get("/athletes/1"))
                .andExpect(status().isOk())
                .andExpect(content().string(expectedJson)));
    }
    @Test
    public void updateAthletebyIDTest() throws Exception {
        String expectedJson = "{"
            + "\"firstName\": \"John\","
            + "\"lastName\": \"Doe\","
            + "\"email\": \"john.doe@example.com\","
            + "\"dob\": \"1990-01-01\","
            + "\"sex\": \"M\","
            + "\"username\": \"johndoe\","
            + "\"password\": \"securepassword123\","
            + "\"role\": \"USER\""
            + "}";
        mockMvc.perform(put("/athletes/1")
                .content(expectedJson)
                .contentType(MediaType.TEXT_PLAIN))
                .andExpect(status().isOk())
                .andExpect(content().string(expectedJson));
    } 
    @Test
    public void deleteAthleteByIDTest() throws Exception {
        mockMvc.perform(delete("/athletes/1")
                .andExpect(status().isOk());
    }
    @Test
    public void getAthletebyLastNameTest() throws Exception {
        String expectedJson = "{"
            + "\"firstName\": \"John\","
            + "\"lastName\": \"Doe\","
            + "\"email\": \"john.doe@example.com\","
            + "\"dob\": \"1990-01-01\","
            + "\"sex\": \"Male\","
            + "\"username\": \"johndoe\","
            + "\"password\": \"securepassword123\","
            + "\"role\": \"USER\""
            + "}";
        mockMvc.perform(get("/athletes/search")
                .content("Doe")
                .contentType(MediaType.TEXT_PLAIN))
                .andExpect(status().isOk());
                .andExpect(content().string(expectedJson));
    }
}
