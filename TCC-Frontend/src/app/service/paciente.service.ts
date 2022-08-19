import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponsePageable } from 'app/shared/Paginacao';
import { Observable } from 'rxjs';

import { Paciente } from '../model/paciente';

@Injectable({
    providedIn: 'root',
})
export class PacienteService {
    private readonly baseURL = 'http://localhost:8080/api';
    private readonly endPoint = 'pacientes';

    constructor(private httpClient: HttpClient) {}

    listarPages(page = 0, size = 10): Observable<ResponsePageable> {
        const httpHeader = new HttpHeaders();
        let pageable = new HttpParams();
        pageable = pageable.append('page', page);
        pageable = pageable.append('size', size);
        return this.httpClient.get<ResponsePageable>(`${this.baseURL}/${this.endPoint}`, {
            headers: httpHeader,
            params: pageable,
        });
    }

    pesquisar(key = '') {
        const httpHeader = new HttpHeaders();
        let search = new HttpParams();
        search = search.append('key', key);
        return this.httpClient.get(`${this.baseURL}/${this.endPoint}/search`, {
            headers: httpHeader,
            params: search,
        });
    }

    salvar(paciente: Paciente): Observable<Paciente> {
        return this.httpClient.post<Paciente>(`${this.baseURL}/${this.endPoint}`, paciente);
    }

    pesquisarPorId(id: number): Observable<Paciente> {
        return this.httpClient.get<Paciente>(`${this.baseURL}/${this.endPoint}/${id}`);
    }

    atualizar(paciente: Paciente, id: number): Observable<Paciente> {
        return this.httpClient.put<Paciente>(`${this.baseURL}/${this.endPoint}/${id}`, paciente);
    }

    delete(paciente: Paciente): Observable<{}> {
        return this.httpClient.delete<Paciente>(`${this.baseURL}/${this.endPoint}/${paciente.id}`);
    }

    buscarTodos(): Observable<Paciente[]> {
        return this.httpClient.get<Paciente[]>(`${this.baseURL}/${this.endPoint}/all`);
    }
}
