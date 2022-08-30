import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Profissional } from 'app/model/profissional';
import { ProfissionalService } from 'app/service/profissional.service';
import { Paginator } from 'app/shared/paginator/paginator.class';
import { AgendamentoDialogComponent } from '../agendamento/agendamento-dialog/agendamento-dialog.component';

@Component({
    selector: 'app-profissional',
    templateUrl: './profissional.component.html',
    styleUrls: ['./profissional.component.css'],
})
export class ProfissionalComponent implements OnInit {
    profissionais: Profissional[] = [];
    paginator: Paginator = new Paginator();
    loading = false;
    colunas = ['id', 'nome', 'cnpj', 'email', 'telefone'];
    constructor(private service: ProfissionalService, private snackBar: MatSnackBar, public dialog: MatDialog) {}

    ngOnInit(): void {
        this.listarProfissional();
        this.paginator.urlBase = 'http://localhost:8080/api/profissionais';
    }

    openDialog(): void {
        const dialogRef = this.dialog.open(AgendamentoDialogComponent, {});
    }

    listarProfissional() {
        this.service.listarProfissionais(this.paginator.page, this.paginator.size).subscribe({
            next: (data: any) => {
                this.paginator.records = data.content;
                this.paginator.total = data.totalElements;
                this.paginator.page = data.number;
                this.paginator.size = data.size;
            },
            error: () => {
                this.onError(), (this.loading = false);
            },
        });
    }

    private onError() {
        this.snackBar.open('Erro ao carregar a lista!!', '', { duration: 5000 });
    }

    handlePageEvent(event: PageEvent) {
        this.paginator.page = event.pageIndex;
        this.paginator.size = event.pageSize;
        this.listarProfissional();
        return event;
    }
}
