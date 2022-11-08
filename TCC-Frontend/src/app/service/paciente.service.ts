import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { config } from 'app/config/environment';
import { ResponsePageable } from 'app/shared/Paginacao';
import { catchError, Observable, throwError } from 'rxjs';

import { Paciente } from '../model/paciente';

@Injectable({
    providedIn: 'root',
})
export class PacienteService {
    private readonly endPoint = 'pacientess';
    errorMsg: string | null = null;

    constructor(private httpClient: HttpClient) {}

    listarPages(page = 0, size = 10): Observable<ResponsePageable> {
        const httpHeader = new HttpHeaders();
        let pageable = new HttpParams();

        pageable = pageable.append('page', page);
        pageable = pageable.append('size', size);
        return this.httpClient
            .get<ResponsePageable>(`${config.apiUrl}/${this.endPoint}`, {
                headers: httpHeader,
                params: pageable,
            })
            .pipe(
                catchError((error) => {
                    let errorMsg: string;
                    if (error.error instanceof ErrorEvent) {
                        this.errorMsg = `Error: ${error.error.message}`;
                    } else {
                        this.errorMsg = this.getServerErrorMessage(error);
                        console.log(JSON.stringify(error));
                    }
                    return throwError(this.errorMsg);
                })
            );
    }

    private getServerErrorMessage(error: HttpErrorResponse): string {
        switch (error.status) {
            case 404: {
                return `Not Found: ${error.message}`;
            }
            case 403: {
                return `Access Denied: ${error.message}`;
            }
            case 500: {
                return `Internal Server Error: ${error.message}`;
            }
            default: {
                return `Unknown Server Error: ${error.message}`;
            }
        }
    }

    pesquisar(key = '') {
        const httpHeader = new HttpHeaders();
        let search = new HttpParams();
        search = search.append('key', key);
        return this.httpClient.get(`${config.apiUrl}/${this.endPoint}/search`, {
            headers: httpHeader,
            params: search,
        });
    }

    salvar(paciente: Paciente): Observable<Paciente> {
        if (paciente != null) return this.httpClient.post<Paciente>(`${config.apiUrl}/${this.endPoint}`, paciente);
        else throw new Error('Erro ao criar paciente');
    }

    pesquisarPorId(id: number): Observable<Paciente> {
        try {
            return this.httpClient.get<Paciente>(`${config.apiUrl}/${this.endPoint}/${id}`);
        } catch (error) {
            throw new Error('Erro ao encontrar paciente');
        }
    }

    atualizar(paciente: Paciente, id: number): Observable<Paciente> {
        if (paciente === undefined || paciente === null) throw new Error('Erro ao Atualizar paciente');

        try {
            return this.httpClient.put<Paciente>(`${config.apiUrl}/${this.endPoint}/${id}`, paciente);
        } catch (error) {
            throw new Error('Erro ao encontrar paciente');
        }
    }

    delete(paciente: Paciente): Observable<{}> {
        return this.httpClient.delete<Paciente>(`${config.apiUrl}/${this.endPoint}/${paciente.id}`);
    }

    buscarTodos(): Observable<Paciente[]> {
        return this.httpClient.get<Paciente[]>(`${config.apiUrl}/${this.endPoint}/all`);
    }
}
