import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Agendamento } from 'app/model/agendamento';
import { ResponsePageable } from 'app/shared/Paginacao';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AgendamentoService {
    private readonly baseURL = 'http://localhost:8080/api';
    private readonly endPoint = 'agendamentos';
    constructor(private httpClient: HttpClient) {}

    listarAgenda(page = 0, size = 10): Observable<ResponsePageable> {
        const httpHeader = new HttpHeaders();
        let pageable = new HttpParams();
        pageable = pageable.append('page', page);
        pageable = pageable.append('size', size);
        return this.httpClient.get<ResponsePageable>(`${this.baseURL}/${this.endPoint}`, {
            headers: httpHeader,
            params: pageable,
        });
    }

    salvar(agendamento: Agendamento): Observable<Agendamento> {
        return this.httpClient.post<Agendamento>(`${this.baseURL}/${this.endPoint}`, agendamento);
    }

    pesquisarPorId(id: number): Observable<Agendamento> {
        return this.httpClient.get<Agendamento>(`${this.baseURL}/${this.endPoint}/${id}`);
    }

    atualizar(agendamento: Agendamento, id: number): Observable<Agendamento> {
        return this.httpClient.put<Agendamento>(`${this.baseURL}/${this.endPoint}/${id}`, agendamento);
    }

    delete(agendamento: Agendamento): Observable<{}> {
        return this.httpClient.delete<Agendamento>(`${this.baseURL}/${this.endPoint}/${agendamento.id}`);
    }
}
