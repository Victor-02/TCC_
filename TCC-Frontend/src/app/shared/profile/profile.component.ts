import { Component, OnInit } from '@angular/core';
import { User } from 'app/model/user';
import { UserService } from 'app/service/user.service';

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
}
