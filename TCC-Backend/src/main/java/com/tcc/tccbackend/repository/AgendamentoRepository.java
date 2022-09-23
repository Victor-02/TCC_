package com.tcc.tccbackend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.tcc.tccbackend.models.Agendamento;

@Repository
public interface AgendamentoRepository extends JpaRepository<Agendamento, Integer> {

    @Query(value = "select * from agendamentos", nativeQuery = true)
    List<Object[]> agendamentos();
}
