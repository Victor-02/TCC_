import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { Agendamento } from 'app/model/agendamento';
import { Paciente } from 'app/model/paciente';
import { AgendamentoService } from 'app/service/agendamento.service';
import { PacienteService } from 'app/service/paciente.service';

@Component({
    selector: 'app-agendamento-dialog',
    templateUrl: './agendamento-dialog.component.html',
    styleUrls: ['./agendamento-dialog.component.css'],
})
export class AgendamentoDialogComponent implements OnInit {
    agendamento!: Agendamento;
    fGroup!: FormGroup;
    pacientes: Paciente[] = [];

    constructor(
        private formBuilder: FormBuilder,
        private service: AgendamentoService,
        private servicePaciente: PacienteService,
        private router: Router,
        private snackBar: MatSnackBar,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.agendamento = this.activatedRoute.snapshot.data['agendamento'];

        this.fGroup = this.formBuilder.group({
            paciente: ['', Validators.required],
            data: ['', Validators.required],
            servico: ['', Validators.required],
        });
    }

    salvar() {
        if (this.agendamento && this.agendamento.id) {
            this.service.atualizar(this.fGroup.value, this.agendamento.id).subscribe({
                next: () => this.router.navigateByUrl('/agendamentos'),
                error: () => this.onErrorEdicao(),
            });
        } else {
            this.service.salvar(this.fGroup.value).subscribe({
                next: () => this.router.navigateByUrl('/agendamentos'),
                error: () => this.onErrorAgendamento(),
            });
        }
    }

    deletar() {
        this.service.delete(this.agendamento).subscribe({
            next: () => this.router.navigateByUrl('/agendamentos'),
            error: () => this.onErrorDelete(),
        });
    }

    buscarPaciente() {
        return this.servicePaciente.buscarTodos().subscribe({
            next: (data) => (this.pacientes = data),
        });
    }

    private onErrorAgendamento() {
        this.snackBar.open('Erro ao salvar agendamento!', '', { duration: 3500 });
    }
    private onErrorDelete() {
        this.snackBar.open('Erro ao deletar agendamento!', '', { duration: 3500 });
    }
    private onErrorEdicao() {
        this.snackBar.open('Erro ao editar agendamento!', '', { duration: 3500 });
    }
}
