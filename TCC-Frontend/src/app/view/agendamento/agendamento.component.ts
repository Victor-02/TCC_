import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Agendamento } from 'app/model/agendamento';
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
        this.service.listarPages(this.paginator.page, this.paginator.size).subscribe({
            next: (data) => {
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

    private onSuccessUpload() {
        this.snackBar.open('Veículo importado com sucesso!', '', {
            duration: 3500,
        });
    }

    private onErrorUpload() {
        this.snackBar.open('Erro ao importar arquivo!', '', { duration: 3500 });
    }

    onChange(event: any) {
        const arquivoSelecionado = <File>event.target.files[0];
        if (arquivoSelecionado) this.upload(arquivoSelecionado);
    }

    private upload(arquivo: File) {
        return this.service.uploadArquivo(arquivo).subscribe({
            next: () => this.onSuccessUpload(),
            error: () => this.onErrorUpload(),
            complete: () => location.reload(),
        });
    }

    handlePageEvent(event: PageEvent) {
        this.paginator.page = event.pageIndex;
        this.paginator.size = event.pageSize;
        this.listarAgenda();
        return event;
    }
}
