import { AgendamentoDialogComponent } from './agendamento-dialog/agendamento-dialog.component';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Agendamento } from 'app/model/agendamento';
import { AgendamentoService } from 'app/service/agendamento.service';
import { Paginator } from 'app/shared/paginator/paginator.class';
import * as moment from 'moment';

@Component({
    selector: 'app-agendamento',
    templateUrl: './agendamento.component.html',
    styleUrls: ['./agendamento.component.css'],
})
export class AgendamentoComponent implements OnInit {
    importacoes: Agendamento[] = [];
    paginator: Paginator = new Paginator();
    loading = false;
    dateForm = new FormGroup({
        data: new FormControl(''),
    });
    colunas = ['id', 'paciente', 'servico', 'data'];
    constructor(private service: AgendamentoService, private snackBar: MatSnackBar, public dialog: MatDialog) {}

    ngOnInit(): void {
        this.listarAgenda();
        this.paginator.urlBase = 'http://localhost:8080/api/Agendamento';
    }

    openDialog(): void {
        const dialogRef = this.dialog.open(AgendamentoDialogComponent, {});
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
    filtro(event: any) {
        let newDate: moment.Moment = moment.utc(this.dateForm.value.data).local();
        this.dateForm.value.data = newDate.format('YYYY-MM-DD');
    }
}
