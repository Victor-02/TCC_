import { Servico } from './../../model/servico';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ServicoService } from 'app/service/servico.service';
import { AgendamentoDialogComponent } from '../agendamento/agendamento-dialog/agendamento-dialog.component';
import { Paginator } from 'app/shared/paginator/paginator.class';

@Component({
    selector: 'app-servico',
    templateUrl: './servico.component.html',
    styleUrls: ['./servico.component.css'],
})
export class ServicoComponent implements OnInit {
    servicos: Servico[] = [];
    paginator: Paginator = new Paginator();
    loading = false;
    colunas = ['id', 'nome', 'preco'];
    constructor(private service: ServicoService, private snackBar: MatSnackBar, public dialog: MatDialog) {}

    ngOnInit(): void {
        this.listarServico();
        this.paginator.urlBase = 'http://localhost:8080/api/servicos';
    }

    openDialog(): void {
        const dialogRef = this.dialog.open(AgendamentoDialogComponent, {});
    }

    listarServico() {
        this.service.listarServicos(this.paginator.page, this.paginator.size).subscribe({
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
        this.listarServico();
        return event;
    }
}
