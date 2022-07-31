import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PacienteResolverService } from 'app/service/paciente-resolver.service';
import { PacienteCadastrarEditarComponent } from './paciente-cadastrar-editar/paciente-cadastrar-editar.component';
import { PacienteImportacaoComponent } from './paciente-importacao/paciente-importacao/paciente-importacao.component';
import { PacienteComponent } from './paciente-list/paciente.component';

const routes: Routes = [
    { path: '', component: PacienteComponent },
    { path: 'importacao', component: PacienteImportacaoComponent },
    {
        path: 'cadastrar',
        component: PacienteCadastrarEditarComponent,
        resolve: { veiculo: PacienteResolverService },
    },
    {
        path: 'editar/:id',
        component: PacienteCadastrarEditarComponent,
        resolve: { veiculo: PacienteResolverService },
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PacienteRoutingModule {}
