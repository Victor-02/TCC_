import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PacienteRoutingModule } from './paciente-routing.module';
import { PacienteComponent } from './paciente-list/paciente.component';
import { MatImportsModule } from 'app/shared/mat-imports/mat-imports.module';
import { PacienteCadastrarEditarComponent } from './paciente-cadastrar-editar/paciente-cadastrar-editar.component';
import { PaginatorComponent } from 'app/shared/paginator/paginator.component';
import { PacienteImportacaoComponent } from './paciente-importacao/paciente-importacao.component';

@NgModule({
    declarations: [
        PacienteComponent,
        PacienteCadastrarEditarComponent,
        PaginatorComponent,
        PacienteImportacaoComponent,
    ],
    imports: [CommonModule, PacienteRoutingModule, MatImportsModule],
})
export class PacienteModule {}
