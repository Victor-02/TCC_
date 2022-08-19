import { Agendamento } from 'app/model/agendamento';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { PacienteService } from 'app/service/paciente.service';

@Component({
    selector: 'app-agendamento-cadastrar',
    templateUrl: './agendamento-cadastrar.component.html',
    styleUrls: ['./agendamento-cadastrar.component.css'],
})
export class AgendamentoCadastrarComponent implements OnInit {
    agendamento!: Agendamento;
    fGroup!: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private service: PacienteService,
        private router: Router,
        private snackBar: MatSnackBar
    ) {}

    ngOnInit(): void {
        this.fGroup = this.formBuilder.group({
            paciente: ['', Validators.required],
            data: ['', Validators.required],
            servico: ['', Validators.required],
        });
    }

    salvar() {
        this.service.salvar(this.fGroup.value).subscribe({
            next: () => this.router.navigateByUrl('/agendamentos'),
            error: () => this.onErrorAgendamento(),
        });
    }

    private onErrorAgendamento() {
        this.snackBar.open('Erro ao salvar veículo!', '', { duration: 3500 });
    }
    private onErrorDelete() {
        this.snackBar.open('Erro ao deletar veículo!', '', { duration: 3500 });
    }
}
