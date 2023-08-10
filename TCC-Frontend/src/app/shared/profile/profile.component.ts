import { Component, OnInit } from '@angular/core';
import { User } from 'app/model/user';
import { UserService } from 'app/service/user.service';
import { delay } from 'rxjs';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
    user: User = {} as User;
    id: number = sessionStorage.getItem('id') ? Number(sessionStorage.getItem('id')) : 0;

    constructor(private service: UserService) {}

    ngOnInit(): void {
        this.getUser();
    }

    getUser() {
        delay(1000);
        this.service.getUser(this.id).subscribe({
            next: (data: any) => {
                this.user = data;
            },
        });
    }

    logout() {
        sessionStorage.clear();
        window.location.reload();
    }

    delay(ms: number) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
}
