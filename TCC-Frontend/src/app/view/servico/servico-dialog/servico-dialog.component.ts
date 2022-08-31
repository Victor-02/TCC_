import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ServicoService } from 'app/service/servico.service';

@Component({
    selector: 'app-servico-dialog',
    templateUrl: './servico-dialog.component.html',
    styleUrls: ['./servico-dialog.component.css'],
})
export class ServicoDialogComponent implements OnInit {
    fGroup!: FormGroup;

    constructor(private formBuilder: FormBuilder, private service: ServicoService, private snackBar: MatSnackBar) {}

    ngOnInit(): void {
        this.fGroup = this.formBuilder.group({
            nome: ['', Validators.required],
            preco: ['', Validators.required],
        });
    }

    salvar() {
        this.service.salvar(this.fGroup.value).subscribe({
            next: () => window.location.reload(),
            error: () => this.onErrorCadastro(),
        });
    }

    private onErrorCadastro() {
        this.snackBar.open('Erro ao salvar serviço!', '', { duration: 3500 });
    }
}
