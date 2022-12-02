import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PacienteCadastrarEditarComponent } from './paciente-cadastrar-editar/paciente-cadastrar-editar.component';
import { PacienteImportacaoComponent } from './paciente-importacao/paciente-importacao.component';
import { PacienteComponent } from './paciente-list/paciente.component';

const routes: Routes = [
    { path: '', component: PacienteComponent },
    { path: 'importacao', component: PacienteImportacaoComponent },
    {
        path: 'cadastrar',
        component: PacienteCadastrarEditarComponent,
    },
    {
        path: 'editar/:id',
        component: PacienteCadastrarEditarComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PacienteRoutingModule {}
