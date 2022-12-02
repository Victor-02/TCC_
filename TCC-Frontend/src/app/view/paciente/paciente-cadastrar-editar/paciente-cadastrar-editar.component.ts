import { PacienteService } from '../../../service/paciente.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Paciente } from '../../../model/paciente';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-paciente-cadastrar-editar',
    templateUrl: './paciente-cadastrar-editar.component.html',
    styleUrls: ['./paciente-cadastrar-editar.component.css'],
})
export class PacienteCadastrarEditarComponent implements OnInit {
    fGroup!: FormGroup;
    paciente: Paciente = new Paciente();
    id: any = 0;

    constructor(
        private formBuilder: FormBuilder,
        private service: PacienteService,
        private router: Router,
        private snackBar: MatSnackBar,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.id = this.activatedRoute.snapshot.paramMap.get('id');
        if (this.id) {
            this.service.pesquisarPorId(this.id).subscribe({
                next: (data) => (this.paciente = data),
            });
        }

        this.fGroup = this.formBuilder.group({
            nome: [this.paciente && this.paciente.nome ? this.paciente.nome : '', Validators.required],
            email: [this.paciente && this.paciente.email ? this.paciente.email : '', Validators.required],
            cpf: [this.paciente && this.paciente.cpf ? this.paciente.cpf : '', Validators.required],
            telefone: [this.paciente && this.paciente.telefone ? this.paciente.telefone : '', Validators.required],
            dataNascimento: [this.paciente && this.paciente.dataNascimento ? this.paciente.dataNascimento : ''],
        });
    }

    salvar() {
        if (this.paciente && this.paciente.id) {
            this.service.atualizar(this.fGroup.value, this.paciente.id).subscribe({
                next: () => this.router.navigateByUrl('/pacientes'),
                error: () => this.onErrorEdicao(),
            });
        } else {
            this.service.salvar(this.fGroup.value).subscribe({
                next: () => this.router.navigateByUrl('/pacientes'),
                error: () => this.onErrorCadastro(),
            });
        }
    }

    deletar() {
        this.service.delete(this.paciente).subscribe({
            next: () => this.router.navigateByUrl('/pacientes'),
            error: () => this.onErrorDelete(),
        });
    }

    private onErrorCadastro() {
        this.snackBar.open('Erro ao salvar paciente!', '', { duration: 3500 });
    }
    private onErrorEdicao() {
        this.snackBar.open('Erro ao editar paciente!', '', { duration: 3500 });
    }
    private onErrorDelete() {
        this.snackBar.open('Erro ao deletar paciente!', '', { duration: 3500 });
    }
}
