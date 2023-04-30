import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { config } from 'app/config/environment';
import { Observable } from 'rxjs';

import { User } from 'app/model/user';

const httpHeaders: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + sessionStorage.getItem('auth'),
});

@Injectable({
    providedIn: 'root',
})
export class UserService {
    constructor(private httpClient: HttpClient) {}

    getUser(id: number): Observable<User> {
        try {
            console.log(httpHeaders);

            return this.httpClient.get<User>(`${config.apiUrl}/user/${id}`, {
                headers: httpHeaders,
            });
        } catch (error) {
            throw new Error('Erro ao encontrar usuário');
        }
    }
}
