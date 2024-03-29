import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { Agendamento } from 'app/model/agendamento';
import { Paciente } from 'app/model/paciente';
import { Profissional } from 'app/model/profissional';
import { Servico } from 'app/model/servico';
import { AgendamentoService } from 'app/service/agendamento.service';
import { PacienteService } from 'app/service/paciente.service';
import { ProfissionalService } from 'app/service/profissional.service';
import { ServicoService } from 'app/service/servico.service';
import * as moment from 'moment';

@Component({
    selector: 'app-agendamento-dialog',
    templateUrl: './agendamento-dialog.component.html',
    styleUrls: ['./agendamento-dialog.component.css'],
})
export class AgendamentoDialogComponent implements OnInit {
    agendamento!: Agendamento;
    fGroup!: FormGroup;
    pacientes: Paciente[] = [];
    servicos: Servico[] = [];
    profissionais: Profissional[] = [];

    constructor(
        private formBuilder: FormBuilder,
        private service: AgendamentoService,
        private pacienteService: PacienteService,
        private profissionalService: ProfissionalService,
        private servicoService: ServicoService,
        private router: Router,
        private snackBar: MatSnackBar,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.preencheDados();
        this.fGroup = this.formBuilder.group({
            paciente: ['', Validators.required],
            profissional: ['', Validators.required],
            servico: ['', Validators.required],
            data: ['', Validators.required],
            horario: ['', Validators.required],
        });
    }

    salvar() {
        let newDate: moment.Moment = moment.utc(this.fGroup.value.data).local();
        this.fGroup.value.data = newDate.format('DD-MM-YYYY') + 'T' + this.fGroup.value.horario;
        console.log(this.fGroup.value.data, newDate.format('DD-MM-YYYY') + 'T' + this.fGroup.value.horario);

        console.log(this.fGroup.value);
        this.service.salvar(this.fGroup.value).subscribe({
            next: () => window.location.reload(),
            error: () => this.onErrorAgendamento(),
        });
    }

    deletar() {
        this.service.delete(this.agendamento).subscribe({
            next: () => this.router.navigateByUrl('/agendamentos'),
            error: (error) => this.onErrorDelete(error),
        });
    }

    buscarPaciente() {
        return this.pacienteService.buscarTodos().subscribe({
            next: (data) => (this.pacientes = data),
        });
    }

    private onErrorAgendamento() {
        this.snackBar.open('Erro ao salvar agendamento!', '', { duration: 3500 });
    }
    private onErrorDelete(error: string) {
        this.snackBar.open(error, '', { duration: 3500 });
    }

    private preencheDados() {
        this.pacienteService.buscarTodos().subscribe((data) => (this.pacientes = data));
        this.profissionalService.buscarTodos().subscribe((data) => (this.profissionais = data));
        this.servicoService.buscarTodos().subscribe((data) => (this.servicos = data));
    }
}
