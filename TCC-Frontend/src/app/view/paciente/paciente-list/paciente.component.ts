import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Paginator } from 'app/shared/paginator/paginator.class';

import { Paciente } from '../../../model/paciente';
import { PacienteService } from '../../../service/paciente.service';

@Component({
    selector: 'app-paciente',
    templateUrl: './paciente.component.html',
    styleUrls: ['./paciente.component.css'],
})
export class PacienteComponent implements OnInit {
    pacientes: Paciente[] = [];
    paginator: Paginator = new Paginator();
    loading = false;
    searchResults: any;
    filtroResults: any;
    colunas = ['id', 'nome', 'email', 'cpf', 'telefone', 'dataNascimento'];
    searchForm = new FormGroup({
        search: new FormControl('', Validators.minLength(1)),
    });

    constructor(private service: PacienteService, private router: Router, private snackBar: MatSnackBar) {}

    ngOnInit() {
        this.listarPages();
    }

    listarPages() {
        this.service.listarPages(this.paginator.page, this.paginator.size).subscribe({
            next: (data) => {
                this.paginator.records = data.content;
                this.paginator.total = data.totalElements;
                this.paginator.page = data.number;
                this.paginator.size = data.size;
                this.loading = false;
            },

            error: () => {
                this.onError(), (this.loading = false);
            },
        });
    }

    editar(id: number) {
        return this.router.navigateByUrl(`pacientes/editar/${id}`);
    }

    private onError() {
        this.snackBar.open('Erro ao carregar a lista!!', '', {
            duration: 5000,
        });
    }

    resetaPesquisa() {
        this.searchForm.reset();
        this.listarPages();
    }

    search(key: any) {
        if (key.length > 0) {
            this.service.pesquisar(key).subscribe((v) => {
                this.loading = false;
                this.searchResults = v;
                this.paginator.records = this.searchResults;
            });
        }
    }

    handlePageEvent(event: PageEvent) {
        this.paginator.page = event.pageIndex;
        this.paginator.size = event.pageSize;
        this.listarPages();
        return event;
    }
}
