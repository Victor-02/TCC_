import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Agendamento } from 'app/model/agendamento';
import { AgendamentoService } from 'app/service/agendamento.service';

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
        private service: AgendamentoService,
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
