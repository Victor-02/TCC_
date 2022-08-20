package com.tcc.tccbackend.repository;

import com.tcc.tccbackend.models.Agendamento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AgendamentoRepository extends JpaRepository<Agendamento, Integer> {
    //List<Agendamento> findByDataBetween(String data);
}
