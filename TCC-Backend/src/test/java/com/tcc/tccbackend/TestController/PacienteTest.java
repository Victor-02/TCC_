package com.tcc.tccbackend.TestController;

import com.tcc.tccbackend.builder.PacienteDTOBuilder;
import com.tcc.tccbackend.controllers.PacienteController;
import com.tcc.tccbackend.dtos.PacienteDTO;
import com.tcc.tccbackend.services.PacienteService;
import org.junit.Test;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import javax.persistence.EntityNotFoundException;

import java.util.ArrayList;

import static com.tcc.tccbackend.util.JsonConvertionUtils.asJsonString;
import static org.hamcrest.core.Is.is;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(MockitoExtension.class)
public class PacienteTest extends BaseTest {

    @Autowired
    private MockMvc mockMvc;

    @Mock
    private PacienteService pacienteService;

    @InjectMocks
    private PacienteController pacienteController;

    @BeforeEach
    public void setup() {
        mockMvc = MockMvcBuilders.standaloneSetup(pacienteController).build();
    }

    @Test
    @DisplayName("Retorna erro quando busca todos os pacientes sem autenticação")
    public void t1() throws Exception {

        mockMvc.perform(post("/pacientes")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isUnauthorized());
    }

    @Test
    @DisplayName("Retorna sucesso quando busca todos os pacientes")
    public void t2() throws Exception {

        when(pacienteService.getAll()).thenReturn(new ArrayList<>());

        mockMvc.perform(get("/pacientes")
                        .header("Authorization", getJWT())
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }

    @Test
    @DisplayName("Retorna erro quando busca um paciente que não existe")
    public void t3() throws Exception {
        PacienteDTO pacienteDTO = PacienteDTOBuilder.builder().build().toPacienteDTO();

        when(pacienteService.findById(pacienteDTO.getId())).thenThrow(EntityNotFoundException.class);

        mockMvc.perform(get("/pacientes" + pacienteDTO.getId())
                        .header("Authorization", getJWT())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(asJsonString(pacienteDTO)))
                .andExpect(status().isNotFound());
    }

        @Test
        @DisplayName("Retorna sucesso quando busca um paciente ")
        public void t4 () throws Exception {
            PacienteDTO pacienteDTO = PacienteDTOBuilder.builder().build().toPacienteDTO();

            when(pacienteService.findById(pacienteDTO.getId())).thenReturn(pacienteDTO);

            mockMvc.perform(get("/pacientes" + pacienteDTO.getId())
                            .header("Authorization", getJWT())
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(asJsonString(pacienteDTO)))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.nome", is(pacienteDTO.getNome())))
                    .andExpect(jsonPath("$.email", is(pacienteDTO.getEmail())))
                    .andExpect(jsonPath("$.cpf", is(pacienteDTO.getCpf())))
                    .andExpect(jsonPath("$.telefone", is(pacienteDTO.getTelefone())))
                    .andExpect(jsonPath("$.dataNascimento", is(pacienteDTO.getDataNascimento())));
        }

        @Test
        @DisplayName("Retorna sucesso quando cadastrar um paciente")
        void t5 () throws Exception {
            PacienteDTO pacienteDTO = PacienteDTOBuilder.builder().build().toPacienteDTO();

            when(pacienteService.save(pacienteDTO)).thenReturn(pacienteDTO);

            mockMvc.perform(post("/pacientes")
                            .header("Authorization", getJWT())
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(asJsonString(pacienteDTO)))
                    .andExpect(status().isCreated())
                    .andExpect(jsonPath("$.nome", is(pacienteDTO.getNome())))
                    .andExpect(jsonPath("$.email", is(pacienteDTO.getEmail())))
                    .andExpect(jsonPath("$.cpf", is(pacienteDTO.getCpf())))
                    .andExpect(jsonPath("$.telefone", is(pacienteDTO.getTelefone())))
                    .andExpect(jsonPath("$.dataNascimento", is(pacienteDTO.getDataNascimento())));
        }
    }
