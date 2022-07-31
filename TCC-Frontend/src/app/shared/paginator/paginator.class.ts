export class Paginator {
    urlBase: string = '#';
    orderBy: string = 'nome';
    orderDir: 'ASC' | 'DESC' = 'ASC';
    search: string = '';
    size: number = 10;
    page: number = 0;
    records!: any[];
    filtered: number = 0;
    total: number = 0;
}
