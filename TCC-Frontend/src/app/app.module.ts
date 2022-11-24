import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxMaskModule } from 'ngx-mask';

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
    ],
    imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule, MatImportsModule, HttpClientModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
