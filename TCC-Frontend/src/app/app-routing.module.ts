import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgendamentoCadastrarComponent } from './view/agendamento/agendamento-cadastrar/agendamento-cadastrar.component';
import { AgendamentoComponent } from './view/agendamento/agendamento.component';
import { HomeComponent } from './view/home/home.component';
import { LoginComponent } from './view/login/login.component';
import { ProfissionalComponent } from './view/profissional/profissional.component';
import { ServicoComponent } from './view/servico/servico.component';

const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'servicos', component: ServicoComponent },
    { path: 'profissionais', component: ProfissionalComponent },
    { path: 'agendamentos', component: AgendamentoComponent },
    { path: 'agendamentos-cadastro', component: AgendamentoCadastrarComponent },

    {
        path: 'pacientes',
        loadChildren: () => import('./view/paciente/paciente.module').then((module) => module.PacienteModule),
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
