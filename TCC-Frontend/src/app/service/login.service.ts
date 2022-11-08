import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

//instancia desse servico fica exposta globalmente
@Injectable({ providedIn: 'root' })
export class LoginService {
    constructor(private httpClient: HttpClient) {}

    public login(data: any): Observable<any> {
        return this.httpClient.post<any>('', data);
    }
}
