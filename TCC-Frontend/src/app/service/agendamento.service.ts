import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponsePageable } from 'app/shared/Paginacao';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AgendamentoService {
    private readonly baseURL = 'http://localhost:8080/api';
    private readonly endPoint = 'agendamentos';
    constructor(private http: HttpClient) {}

    listarAgenda(page = 0, size = 10): Observable<ResponsePageable> {
        const httpHeader = new HttpHeaders();
        let pageable = new HttpParams();
        pageable = pageable.append('page', page);
        pageable = pageable.append('size', size);
        return this.http.get<ResponsePageable>(`${this.baseURL}/${this.endPoint}`, {
            headers: httpHeader,
            params: pageable,
        });
    }
}
