import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './view/home/home.component';
import { MatImportsModule } from './shared/mat-imports/mat-imports.module';
import { PaginatorComponent } from './shared/paginator/paginator.component';
import { AgendamentoComponent } from './view/agendamento/agendamento.component';
import { ImportacaoComponent } from './view/importacao/importacao.component';

@NgModule({
    declarations: [AppComponent, HomeComponent, AgendamentoComponent, ImportacaoComponent],
    imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule, MatImportsModule, HttpClientModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
