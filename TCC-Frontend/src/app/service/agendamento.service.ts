import { config } from 'app/config/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Agendamento } from 'app/model/agendamento';
import { ResponsePageable } from 'app/shared/Paginacao';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AgendamentoService {
    private readonly endPoint = 'agendamentos';
    constructor(private httpClient: HttpClient) {}

    listarAgenda(page = 0, size = 10): Observable<ResponsePageable> {
        const httpHeader = new HttpHeaders();
        let pageable = new HttpParams();
        pageable = pageable.append('page', page);
        pageable = pageable.append('size', size);
        return this.httpClient.get<ResponsePageable>(`${config.apiUrl}/${this.endPoint}`, {
            headers: httpHeader,
            params: pageable,
        });
    }

    salvar(agendamento: Agendamento): Observable<Agendamento> {
        const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
        return this.httpClient.post<Agendamento>(`${config.apiUrl}/${this.endPoint}`, agendamento, {
            headers: headers,
        });
    }

    pesquisarPorId(id: number): Observable<Agendamento> {
        return this.httpClient.get<Agendamento>(`${config.apiUrl}/${this.endPoint}/${id}`);
    }

    atualizar(agendamento: Agendamento, id: number): Observable<Agendamento> {
        return this.httpClient.put<Agendamento>(`${config.apiUrl}/${this.endPoint}/${id}`, agendamento);
    }

    delete(agendamento: Agendamento): Observable<{}> {
        return this.httpClient.delete<Agendamento>(`${config.apiUrl}/${this.endPoint}/${agendamento.id}`);
    }
}
