import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'app/service/login.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;

    constructor(
        private fbuilder: FormBuilder,
        private snackBar: MatSnackBar,
        private router: Router,
        private loginService: LoginService
    ) {
        this.loginForm = this.fbuilder.group({
            email: ['', [Validators.email]],
            senha: ['', [Validators.min(5)]],
        });
    }

    ngOnInit(): void {}

    actionLogin() {
        this.loginService.login(this.loginForm.value).subscribe({
            next: (v) => {
                localStorage.setItem('Authorization', v.token);
                this.router.navigate(['/home']);
            },
            error: () => {
                this.onErrorLogin();
            },
        });
    }
    private onErrorLogin() {
        this.snackBar.open('Erro ao logar!', '', { duration: 3500, verticalPosition: 'top' });
    }
}
