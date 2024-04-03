import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { config } from 'app/config/environment';
import { ResponsePageable } from 'app/shared/Paginacao';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ImportacaoService {
    private readonly endPoint = 'importacao';
    constructor(private http: HttpClient) {}

    listarPages(page = 0, size = 10): Observable<ResponsePageable> {
        let pageable = new HttpParams();
        pageable = pageable.append('page', page);
        pageable = pageable.append('size', size);
        return this.http.get<ResponsePageable>(`${config.apiUrl}/${this.endPoint}`, {
            headers: config.httpHeaders,
            params: pageable,
        });
    }

    uploadArquivo(arquivo: File): Observable<any> {
        const data = new FormData();
        const httpHeaders = new HttpHeaders({
            Authorization: 'Bearer ' + sessionStorage.getItem('auth'),
        });
        data.append('file', arquivo);
        return this.http.post(`${config.apiUrl}/${this.endPoint}/upload`, data, {
            responseType: 'text',
            headers: httpHeaders,
        });
    }
}
