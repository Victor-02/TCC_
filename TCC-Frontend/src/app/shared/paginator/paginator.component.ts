import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Paginator } from './paginator.class';

@Component({
    selector: 'app-paginator',
    templateUrl: './paginator.component.html',
})
export class PaginatorComponent implements OnInit {
    @Input() options: Paginator = new Paginator();

    @Output() onGetData: EventEmitter<any> = new EventEmitter();

    ngOnInit(): void {}

    get numbers(): number[] {
        let limit = Math.ceil((this.options.records && this.options.total) / this.options.size);
        limit = limit - 1;
        let numbers = Array.from({ length: limit }, (_, i) => i + 1);
        numbers.unshift(0);
        return numbers;
    }

    order(by: string) {
        if (this.options.orderBy === by) {
            this.options.orderDir = this.options.orderDir === 'ASC' ? 'DESC' : 'ASC';
        } else {
            this.options.orderBy = by;
        }
        this.onGetData.emit();
    }

    size(size: number) {
        this.options.size = size;
        this.options.page = 0;
        this.onGetData.emit();
    }

    search($event: any): void {
        const text = $event.target.value;
        this.options.search = text;
        this.options.page = 0;
        this.onGetData.emit();
    }

    next() {
        this.options.page++;
        this.onGetData.emit();
    }

    prev() {
        this.options.page--;
        this.onGetData.emit();
    }

    to(page: number) {
        this.options.page = page;
        this.onGetData.emit();
    }

    by(order: string) {
        return this.options.orderBy === order;
    }
}
