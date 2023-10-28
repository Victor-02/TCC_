import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CookieService } from 'ngx-cookie-service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatImportsModule } from './shared/mat-imports/mat-imports.module';
import { AgendamentoDialogComponent } from './view/agendamento/agendamento-dialog/agendamento-dialog.component';
import { AgendamentoComponent } from './view/agendamento/agendamento.component';
import { HomeComponent } from './view/home/home.component';
import { LoginComponent } from './view/login/login.component';
import { MainNavComponent } from './view/main-nav/main-nav.component';
import { ProfissionalDialogComponent } from './view/profissional/profissional-dialog/profissional-dialog.component';
import { ProfissionalComponent } from './view/profissional/profissional.component';
import { ServicoDialogComponent } from './view/servico/servico-dialog/servico-dialog.component';
import { ServicoComponent } from './view/servico/servico.component';
import { BreadCrumbComponent } from './shared/breadCrumb/bread-crumb/bread-crumb.component';
import { ProfileComponent } from './shared/profile/profile.component';
import { AuthService } from './auth/auth.service';
import { AuthInterceptor } from './auth/interceptor';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        AgendamentoComponent,
        LoginComponent,
        AgendamentoDialogComponent,
        ServicoComponent,
        ProfissionalComponent,
        ServicoDialogComponent,
        ProfissionalDialogComponent,
        MainNavComponent,
        BreadCrumbComponent,
        ProfileComponent,
    ],
    imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule, MatImportsModule, HttpClientModule],
    providers: [
        CookieService,
        AuthService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true,
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
