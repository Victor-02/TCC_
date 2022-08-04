import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

import { LoginService } from '../../service/login.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;

    constructor(
        private router: Router,
        private fb: FormBuilder,
        private cookieService: CookieService,
        private loginService: LoginService
    ) {
        this.loginForm = this.fb.group({
            sistema: [],
            username: ['', [Validators.required]],
            password: ['', [Validators.required]],
            info: [],
        });
    }

    ngOnInit(): void {}

    actionLogin() {
        this.loginForm.patchValue({
            sistema: 'SegurancaWeb',
            info: 'Login via angular',
        });

        this.loginService.login(this.loginForm.value).subscribe({
            next: (v) => {
                this.cookieService.set('tjmsauth', v.token);
                this.router.navigate(['/home']);
            },
            error: (e) => {
                console.error(e);
            },
            complete: () => console.info('complete'),
        });
    }
}
