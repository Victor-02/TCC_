import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Profissional } from 'app/model/profissional';
import { ResponsePageable } from 'app/shared/Paginacao';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ProfissionalService {
    private readonly baseURL = 'http://localhost:8080/api';
    private readonly endPoint = 'profissionais';
    constructor(private httpClient: HttpClient) {}

    listarProfissionais(page = 0, size = 10): Observable<ResponsePageable> {
        const httpHeader = new HttpHeaders();
        let pageable = new HttpParams();
        pageable = pageable.append('page', page);
        pageable = pageable.append('size', size);
        return this.httpClient.get<ResponsePageable>(`${this.baseURL}/${this.endPoint}`, {
            headers: httpHeader,
            params: pageable,
        });
    }

    salvar(profissional: Profissional): Observable<Profissional> {
        return this.httpClient.post<Profissional>(`${this.baseURL}/${this.endPoint}`, profissional);
    }

    pesquisarPorId(id: number): Observable<Profissional> {
        return this.httpClient.get<Profissional>(`${this.baseURL}/${this.endPoint}/${id}`);
    }

    delete(profissional: Profissional): Observable<{}> {
        return this.httpClient.delete<Profissional>(`${this.baseURL}/${this.endPoint}/${profissional.id}`);
    }
    buscarTodos(): Observable<Profissional[]> {
        return this.httpClient.get<Profissional[]>(`${this.baseURL}/${this.endPoint}/all`);
    }
}
