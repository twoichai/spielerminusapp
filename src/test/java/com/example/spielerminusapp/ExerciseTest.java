package com.example.spielerminusapp;


import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;


import static org.hamcrest.Matchers.is;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class ExerciseTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    public void testGetExercises() throws Exception {
        MvcResult result = mockMvc.perform(get("/athletes/exercises"))
                .andExpect(status().isOk())
                .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
                .andReturn();

        String responseBody = result.getResponse().getContentAsString();
        //For Debugging
        //System.out.println("Response: " + responseBody);

        mockMvc.perform(get("/athletes/exercises"))
                .andExpect(status().isOk())
                .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$[0].id", is(1)))
                .andExpect(jsonPath("$[0].title", is("800m Lauf")))
                .andExpect(jsonPath("$[0].exerciseType", is("AUSDAUER")))

                .andExpect(jsonPath("$[0].rule[0].id", is(1)))
                .andExpect(jsonPath("$[0].rule[0].gender", is("M")))
                .andExpect(jsonPath("$[0].rule[0].fromAge", is(6)))
                .andExpect(jsonPath("$[0].rule[0].toAge", is(7)))
                .andExpect(jsonPath("$[0].rule[0].valueBronze", is(540)))
                .andExpect(jsonPath("$[0].rule[0].valueSilver", is(500)))
                .andExpect(jsonPath("$[0].rule[0].valueGold", is(415)))
                .andExpect(jsonPath("$[0].rule[0].metric", is("MINUTES")))
                .andExpect(jsonPath("$[0].rule[0].label").doesNotExist())
                .andExpect(jsonPath("$[0].rule[0].points").doesNotExist())

                .andExpect(jsonPath("$[0].rule[1].id", is(2)))
                .andExpect(jsonPath("$[0].rule[1].gender", is("M")))
                .andExpect(jsonPath("$[0].rule[1].fromAge", is(8)))
                .andExpect(jsonPath("$[0].rule[1].toAge", is(9)))
                .andExpect(jsonPath("$[0].rule[1].valueBronze", is(525)))
                .andExpect(jsonPath("$[0].rule[1].valueSilver", is(440)))
                .andExpect(jsonPath("$[0].rule[1].valueGold", is(355)))
                .andExpect(jsonPath("$[0].rule[1].metric", is("MINUTES")))
                .andExpect(jsonPath("$[0].rule[1].label").doesNotExist())
                .andExpect(jsonPath("$[0].rule[1].points").doesNotExist());

        // Add similar checks for all other rule entries
    }

    @Test
    public void testGetExerciseForAthlete() throws Exception {
        String athleteId = "1";
        String type = "KRAFT";

        mockMvc.perform(get("/athletes/exercise/{athleteId}", athleteId)
                        .param("type", type)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$[0].id").exists())
                .andExpect(jsonPath("$[0].title").value("Werfen"))
                .andExpect(jsonPath("$[0].exerciseType").value("KRAFT"))
                .andExpect(jsonPath("$[0].rule[0].id").value(52))
                .andExpect(jsonPath("$[0].rule[0].gender").value("M"))
                .andExpect(jsonPath("$[0].rule[0].fromAge").value(12))
                .andExpect(jsonPath("$[0].rule[0].toAge").value(13))
                .andExpect(jsonPath("$[0].rule[0].valueBronze").value(2600))
                .andExpect(jsonPath("$[0].rule[0].valueSilver").value(3000))
                .andExpect(jsonPath("$[0].rule[0].valueGold").value(3300))
                .andExpect(jsonPath("$[0].rule[0].metric").value("METERS"))
                .andExpect(jsonPath("$[0].rule[0].label").value("Schlagball (80 g)"))
                .andExpect(jsonPath("$[1].id").exists())
                .andExpect(jsonPath("$[1].title").value("KugelstoÃŸen"))
                .andExpect(jsonPath("$[1].exerciseType").value("KRAFT"))
                .andExpect(jsonPath("$[1].rule[0].id").value(64))
                .andExpect(jsonPath("$[1].rule[0].gender").value("M"))
                .andExpect(jsonPath("$[1].rule[0].fromAge").value(12))
                .andExpect(jsonPath("$[1].rule[0].toAge").value(13))
                .andExpect(jsonPath("$[1].rule[0].valueBronze").value(625))
                .andExpect(jsonPath("$[1].rule[0].valueSilver").value(675))
                .andExpect(jsonPath("$[1].rule[0].valueGold").value(725))
                .andExpect(jsonPath("$[1].rule[0].metric").value("METERS"))
                .andExpect(jsonPath("$[1].rule[0].label").value("3 kg"));

    }
}