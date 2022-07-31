import { Paciente } from '../model/paciente';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { of } from 'rxjs';

import { PacienteService } from './paciente.service';

@Injectable({
    providedIn: 'root',
})
export class PacienteResolverService implements Resolve<Paciente> {
    constructor(private service: PacienteService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'];

        if (id) {
            return this.service.pesquisarPorId(id);
        }
        return of({} as Paciente);
    }
}
