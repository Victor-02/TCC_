import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './view/home/home.component';
import { MatImportsModule } from './shared/mat-imports/mat-imports.module';
import { AgendamentoComponent } from './view/agendamento/agendamento.component';
import { AgendamentoCadastrarComponent } from './view/agendamento/agendamento-cadastrar/agendamento-cadastrar.component';
import { LoginComponent } from './view/login/login.component';

@NgModule({
    declarations: [AppComponent, HomeComponent, AgendamentoComponent, AgendamentoCadastrarComponent, LoginComponent],
    imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule, MatImportsModule, HttpClientModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
