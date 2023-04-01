import { Component } from '@angular/core';

@Component({
    selector: 'app-breadcrumb',
    templateUrl: './bread-crumb.component.html',
    styleUrls: ['./bread-crumb.component.css'],
})
export class BreadCrumbComponent {
    breadcrumb: string = '';

    constructor() {
        this.getBreadCrumb();
    }

    getBreadCrumb = () => {
        switch (window.location.pathname) {
            case '/pacientes':
                this.breadcrumb = 'Lista de Pacientes';
                break;
            case '/agendamentos':
                this.breadcrumb = 'Lista de Agendamentos';
                break;
            case '/profissionais':
                this.breadcrumb = 'Lista de Profissionais';
                break;
            case '/servicos':
                this.breadcrumb = 'Lista de Serviços';
                break;
            default:
                break;
        }
    };
}
