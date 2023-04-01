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
        let pageable = new HttpParams();
        pageable = pageable.append('page', page);
        pageable = pageable.append('size', size);
        return this.httpClient.get<ResponsePageable>(`${config.apiUrl}/${this.endPoint}`, {
            headers: config.httpHeaders,
            params: pageable,
        });
    }

    salvar(agendamento: Agendamento): Observable<Agendamento> {
        return this.httpClient.post<Agendamento>(`${config.apiUrl}/${this.endPoint}`, agendamento, {
            headers: config.httpHeaders,
        });
    }

    pesquisarPorId(id: number): Observable<Agendamento> {
        return this.httpClient.get<Agendamento>(`${config.apiUrl}/${this.endPoint}/${id}`, {
            headers: config.httpHeaders,
        });
    }

    atualizar(agendamento: Agendamento, id: number): Observable<Agendamento> {
        return this.httpClient.put<Agendamento>(`${config.apiUrl}/${this.endPoint}/${id}`, agendamento, {
            headers: config.httpHeaders,
        });
    }

    delete(agendamento: Agendamento): Observable<{}> {
        return this.httpClient.delete<Agendamento>(`${config.apiUrl}/${this.endPoint}/${agendamento.id}`, {
            headers: config.httpHeaders,
        });
    }
}
