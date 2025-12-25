import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { UserProfile } from '../models/userprofile';
import { loadUsers } from '../users/user.actions';
import {
    selectAllUsers,
    selectUserError,
    selectUserLoading
} from '../users/user.selectors';

@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
    users$: Observable<ReadonlyArray<UserProfile>> = this.store.select(selectAllUsers);
    loading$: Observable<boolean> = this.store.select(selectUserLoading);
    error$: Observable<string | null> = this.store.select(selectUserError);

    constructor(private readonly store: Store<AppState>) { }

    ngOnInit(): void {
        this.store.dispatch(loadUsers());
    }

    reload(): void {
        this.store.dispatch(loadUsers());
    }

    trackById(_: number, user: UserProfile): string {
        return user.id;
    }
}
