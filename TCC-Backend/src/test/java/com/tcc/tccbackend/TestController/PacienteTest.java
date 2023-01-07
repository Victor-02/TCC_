package com.tcc.tccbackend.TestController;
/*


import com.example.tccbackend.controllers.PacienteController;
import com.example.tccbackend.models.Paciente;
import com.example.tccbackend.services.PacienteService;
import io.restassured.http.ContentType;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;

import java.util.Date;

import static io.restassured.RestAssured.baseURI;
import static io.restassured.RestAssured.enableLoggingOfRequestAndResponseIfValidationFails;
import static io.restassured.module.mockmvc.RestAssuredMockMvc.given;
import static io.restassured.module.mockmvc.RestAssuredMockMvc.standaloneSetup;
import static org.hamcrest.CoreMatchers.is;

@WebMvcTest
public class PacienteTest {

    @Autowired
    private PacienteController pacienteController;

    @BeforeEach
    public void setupClass() {
        enableLoggingOfRequestAndResponseIfValidationFails();
        baseURI = "http://localhost:8080";
    }

    @BeforeEach
    public void setup() {
        standaloneSetup(this.pacienteController);
    }

    @MockBean
    private PacienteService pacienteService;

    @Test
    @Order(4)
    public void retornarSucesso_QuandoBuscarTodosVeiculos() {

        given()
                .accept(ContentType.JSON)
                .when()
                .get("/pacientes")
                .then()
                .statusCode(HttpStatus.OK.value());
    }

    @Test
    @Order(1)
    public void retornarSucesso_QuandoBuscarVeiculo() {

        Mockito.when(this.pacienteService.findById(50))
                .thenReturn(new Paciente(50, "Jorge Amado", "jorgin@hotmail.com", 445154, "698799614", new Date(), 'M'));

        given()
                .accept(ContentType.JSON)
                .when()
                .get("/pacientes/{id}", 1)
                .then()
                .statusCode(HttpStatus.OK.value());
    }

    @Test
    @Order(2)
    public void retornarErro_QuandoBuscarVeiculo() {
        given()
                .accept(ContentType.JSON)
                .when()
                .get("/pacientes/{id}", 56)
                .then()
                .statusCode(HttpStatus.NOT_FOUND.value());
    }

    @Test
    @Order(3)
    public void retornarSucesso_QuandoCriarVeiculo() {
        given() //TODO refatorar para colocar um objeto no body
                .accept(ContentType.JSON)
                .body("{"
                        + "\"id\": \"null\","
                        + "\"placaOriginal\": \"CC3D221\","
                        + "\"placaFria\": \"CC3D884\","
                        + "\"numeroProcesso\": \"55713\""
                        + "}")
                .when()
                .post("/pacientes")
                .then()
                .statusCode(HttpStatus.CREATED.value())
                .body("placaOriginal", is("FF4CCS1"));
    }
}*/


import io.restassured.http.ContentType;
import org.junit.Test;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.DisplayName;

import static io.restassured.RestAssured.given;

public class PacienteTest extends BaseTest {

    public String getJWT(){
        return given()
                .body("{\n" +
                        "\t\"email\": \"paula@gmail.com\",\n" +
                        "\t\"senha\": \"senha\"\n" +
                        "}")
                .contentType(ContentType.JSON)
                .when()
                .post("/user/login")
                .then()
                .extract()
                .path("token");
    }

    @Test
    @DisplayName("Retorna erro quando busca todos os pacientes sem autenticação")
    public void t1() {
        given()
                .auth().none()
                .accept(ContentType.JSON)
                .when()
                .get("/pacientes")
                .then()
                .statusCode(403);
    }

    @Test
    @DisplayName("Retorna sucesso quando busca todos os pacientes")
    public void t2() {
        given()
                .header("Authorization", getJWT())
                .accept(ContentType.JSON)
                .when()
                .get("/pacientes")
                .then()
                .statusCode(200);
    }


}
