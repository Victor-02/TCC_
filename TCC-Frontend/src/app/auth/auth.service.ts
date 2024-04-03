import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private authToken: string = '';

    setAuthToken(token: string): void {
        this.authToken = token;
    }

    getAuthToken(): string {
        return this.authToken;
    }

    clearAuthToken(): void {
        this.authToken = '';
    }

    isAuthenticated(): boolean {
        return !!this.authToken;
    }
}
