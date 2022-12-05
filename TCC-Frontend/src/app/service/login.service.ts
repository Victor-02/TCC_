import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoginService {
    constructor(private httpClient: HttpClient) {}

    public login(data: any): Observable<any> {
        return this.httpClient.post<any>('', data);
    }
}
