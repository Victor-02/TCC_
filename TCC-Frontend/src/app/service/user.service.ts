import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { config } from 'app/config/environment';
import { Observable } from 'rxjs';

import { User } from 'app/model/user';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    constructor(private httpClient: HttpClient) {}

    getUser(id: number): Observable<User> {
        try {
            return this.httpClient.get<User>(`${config.apiUrl}/user/${id}`, {
                headers: config.httpHeaders,
            });
        } catch (error) {
            throw new Error('Erro ao encontrar usuário');
        }
    }
}
