import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { config } from 'app/config/environment';
import { User } from 'app/model/user';

@Injectable({ providedIn: 'root' })
export class LoginService {
    constructor(private httpClient: HttpClient) {}

    public login(data: User): Observable<any> {
        const httpHeaders: HttpHeaders = new HttpHeaders({
            'Content-Type': 'application/json',
        });
        return this.httpClient.post<any>(`${config.apiUrl}/user/login`, data, { headers: httpHeaders });
    }
}
