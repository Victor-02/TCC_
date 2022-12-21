package com.tcc.tccbackend.repository;

import com.tcc.tccbackend.dtos.AgendamentoDTO;
import com.tcc.tccbackend.models.Agendamento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AgendamentoRepository extends JpaRepository<Agendamento, Integer> {

    @Query(value = "select new com.tcc.tccbackend.dtos.AgendamentoDTO(a.id, a.data, s.nome, p.nome, pro.nome) " + "from Agendamento a " + "join Paciente p on p.id = a.id " + "join Profissional pro on pro.id = a.id " + "join Servico s on s.id = a.id")
    List<AgendamentoDTO> agendamentos();
}
/*umas AS no select*/