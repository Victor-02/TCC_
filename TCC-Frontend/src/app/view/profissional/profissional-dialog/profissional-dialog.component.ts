import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProfissionalService } from 'app/service/profissional.service';

@Component({
    selector: 'app-profissional-dialog',
    templateUrl: './profissional-dialog.component.html',
    styleUrls: ['./profissional-dialog.component.css'],
})
export class ProfissionalDialogComponent implements OnInit {
    fGroup!: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private service: ProfissionalService,
        private snackBar: MatSnackBar
    ) {}

    ngOnInit(): void {
        this.fGroup = this.formBuilder.group({
            nome: ['', Validators.required],
            cnpj: ['', Validators.required],
            email: ['', Validators.required],
            telefone: ['', Validators.required],
        });
    }

    salvar() {
        this.service.salvar(this.fGroup.value).subscribe({
            next: () => window.location.reload(),
            error: () => this.onErrorCadastro(),
        });
    }

    private onErrorCadastro() {
        this.snackBar.open('Erro ao salvar profissional!', '', { duration: 3500 });
    }
}
