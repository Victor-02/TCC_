import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgendamentoCadastrarComponent } from './view/agendamento/agendamento-cadastrar/agendamento-cadastrar.component';
import { AgendamentoComponent } from './view/agendamento/agendamento.component';
import { HomeComponent } from './view/home/home.component';

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: HomeComponent },
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
