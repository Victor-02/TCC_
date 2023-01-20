package com.tcc.tccbackend.TestController;

import com.tcc.tccbackend.controllers.AgendamentoController;
import com.tcc.tccbackend.services.AgendamentoService;
import io.restassured.http.ContentType;
import io.restassured.module.mockmvc.RestAssuredMockMvc;
import org.hamcrest.Matchers;
import org.junit.Test;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.web.servlet.MockMvc;

import static io.restassured.RestAssured.given;

@WebMvcTest(AgendamentoController.class)
public class AgendamentoTest extends BaseTest {

    @Mock
    private AgendamentoService service;
    @Autowired
    private MockMvc mockMvc;

    @BeforeEach
    public void setup() {
        RestAssuredMockMvc.mockMvc(mockMvc);
    }

    @Test
    @DisplayName("Retorna erro quando busca os agendamentos sem autenticação")
    public void t1() {

        given()
                .auth().none()
                .accept(ContentType.JSON)
                .when()
                .get("/agendamentos")
                .then()
                .statusCode(403);
    }

    @Test
    @DisplayName("Retorna sucesso quando busca os agendamentos")
    public void t2() {
        given()
                .header("Authorization", getJWT())
                .accept(ContentType.JSON).when()
                .get("/agendamentos")
                .then()
                .statusCode(200)
                .body("content", Matchers.notNullValue());
    }
}
