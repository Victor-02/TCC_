import { CookieService } from 'ngx-cookie-service';
import { HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment';

export const httpHeaders: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + sessionStorage.getItem('auth'),
});

export const config = {
    apiUrl: environment.API_URL,
    httpHeaders: httpHeaders,
};
