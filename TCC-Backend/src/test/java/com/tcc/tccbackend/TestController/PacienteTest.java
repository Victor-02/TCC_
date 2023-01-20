package com.tcc.tccbackend.TestController;

import com.tcc.tccbackend.controllers.PacienteController;
import com.tcc.tccbackend.models.Paciente;
import com.tcc.tccbackend.repository.PacienteRepository;
import com.tcc.tccbackend.services.PacienteService;
import io.restassured.http.ContentType;
import io.restassured.module.mockmvc.RestAssuredMockMvc;
import org.hamcrest.Matchers;
import org.junit.Before;
import org.junit.Test;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Date;
import java.util.List;

import static io.restassured.RestAssured.given;

@SpringBootTest
@WebMvcTest(PacienteController.class)
public class PacienteTest extends BaseTest {

    @Autowired
    private MockMvc mockMvc;
    @Before
    public void setup() {
        RestAssuredMockMvc.mockMvc(mockMvc);
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
                .accept(ContentType.JSON).when()
                .get("/pacientes")
                .then()
                .statusCode(200)
                .body(Matchers.notNullValue());
    }

    @Test
    @DisplayName("Retorna erro quando busca um paciente que não existe")
    public void t3() {
        given()
                .header("Authorization", getJWT())
                .accept(ContentType.JSON)
                .when()
                .get("/pacientes/9999")
                .then()
                .statusCode(404)
                .body("mensagem", Matchers.equalTo("Paciente não encontrado"));
    }

    @Test
    @DisplayName("Retorna sucesso quando busca um paciente ")
    public void t4() {
            given()
                .header("Authorization", getJWT())
                .accept(ContentType.JSON)
                .when()
                .get("/pacientes/99999991")
                .then().statusCode(200)
                    .body("nome", Matchers.equalTo("test"))
                    .body("email", Matchers.equalTo("test@test.com"));
    }
}
