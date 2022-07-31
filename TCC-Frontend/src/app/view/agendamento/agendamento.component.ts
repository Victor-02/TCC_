import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Agendamento } from 'app/model/agendamento';
import { AgendamentoService } from 'app/service/agendamento.service';
import { Paginator } from 'app/shared/paginator/paginator.class';

@Component({
    selector: 'app-agendamento',
    templateUrl: './agendamento.component.html',
    styleUrls: ['./agendamento.component.css'],
})
export class AgendamentoComponent implements OnInit {
    importacoes: Agendamento[] = [];
    paginator: Paginator = new Paginator();
    loading = false;
    colunas = ['id', 'nome', 'data'];
    constructor(private service: AgendamentoService, private snackBar: MatSnackBar) {}

    ngOnInit(): void {
        this.listarAgenda();
        this.paginator.urlBase = 'http://localhost:8080/api/Agendamento';
    }

    listarAgenda() {
        this.service.listarAgenda(this.paginator.page, this.paginator.size).subscribe({
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
        this.listarAgenda();
        return event;
    }
}
