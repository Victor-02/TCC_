import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AgendamentoComponent } from './view/agendamento/agendamento.component';
import { HomeComponent } from './view/home/home.component';
import { LoginComponent } from './view/login/login.component';
import { MainNavComponent } from './view/main-nav/main-nav.component';
import { ProfissionalComponent } from './view/profissional/profissional.component';
import { ServicoComponent } from './view/servico/servico.component';

const routes: Routes = [
    {
        path: '',
        component: MainNavComponent,
        children: [
            {
                path: 'pacientes',
                loadChildren: () => import('./view/paciente/paciente.module').then((module) => module.PacienteModule),
            },
            { path: 'home', component: HomeComponent },
            { path: 'servicos', component: ServicoComponent },
            { path: 'profissionais', component: ProfissionalComponent },
            { path: 'agendamentos', component: AgendamentoComponent },
        ],
    },
    { path: 'loginn', component: LoginComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
