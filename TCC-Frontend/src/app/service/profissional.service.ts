import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { config } from 'app/config/environment';
import { Profissional } from 'app/model/profissional';
import { ResponsePageable } from 'app/shared/Paginacao';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ProfissionalService {
    private readonly endPoint = 'profissionais';
    constructor(private httpClient: HttpClient) {}

    listarProfissionais(page = 0, size = 10): Observable<ResponsePageable> {
        const httpHeader = new HttpHeaders();
        let pageable = new HttpParams();
        pageable = pageable.append('page', page);
        pageable = pageable.append('size', size);
        return this.httpClient.get<ResponsePageable>(`${config.apiUrl}/${this.endPoint}`, {
            headers: config.httpHeaders,
            params: pageable,
        });
    }

    salvar(profissional: Profissional): Observable<Profissional> {
        return this.httpClient.post<Profissional>(`${config.apiUrl}/${this.endPoint}`, profissional, {headers: config.httpHeaders,});
    }

    pesquisarPorId(id: number): Observable<Profissional> {
        return this.httpClient.get<Profissional>(`${config.apiUrl}/${this.endPoint}/${id}`, {headers: config.httpHeaders,});
    }

    delete(profissional: Profissional): Observable<{}> {
        return this.httpClient.delete<Profissional>(`${config.apiUrl}/${this.endPoint}/${profissional.id}`, {headers: config.httpHeaders,});
    }
    buscarTodos(): Observable<Profissional[]> {
        return this.httpClient.get<Profissional[]>(`${config.apiUrl}/${this.endPoint}/all`, {headers: config.httpHeaders,});
    }
}
