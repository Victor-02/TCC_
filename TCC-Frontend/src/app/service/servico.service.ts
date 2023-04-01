import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { config } from 'app/config/environment';
import { Servico } from 'app/model/servico';
import { ResponsePageable } from 'app/shared/Paginacao';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ServicoService {
    private readonly endPoint = 'servicos';
    constructor(private httpClient: HttpClient) {}

    listarServicos(page = 0, size = 10): Observable<ResponsePageable> {
        let pageable = new HttpParams();
        pageable = pageable.append('page', page);
        pageable = pageable.append('size', size);
        return this.httpClient.get<ResponsePageable>(`${config.apiUrl}/${this.endPoint}`, {
            headers: config.httpHeaders,
            params: pageable,
        });
    }

    salvar(servico: Servico): Observable<Servico> {
        return this.httpClient.post<Servico>(`${config.apiUrl}/${this.endPoint}`, servico, {
            headers: config.httpHeaders,
        });
    }

    pesquisarPorId(id: number): Observable<Servico> {
        return this.httpClient.get<Servico>(`${config.apiUrl}/${this.endPoint}/${id}`, { headers: config.httpHeaders });
    }

    delete(servico: Servico): Observable<{}> {
        return this.httpClient.delete<Servico>(`${config.apiUrl}/${this.endPoint}/${servico.id}`, {
            headers: config.httpHeaders,
        });
    }
    buscarTodos(): Observable<Servico[]> {
        return this.httpClient.get<Servico[]>(`${config.apiUrl}/${this.endPoint}/all`, { headers: config.httpHeaders });
    }
}
