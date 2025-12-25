import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { MemoizedSelector } from '@ngrx/store';
import { UserListComponent } from './user-list.component';
import { AppState } from '../app.state';
import { UserProfile } from '../models/userprofile';
import {
    selectAllUsers,
    selectUserError,
    selectUserLoading
} from '../users/user.selectors';
import * as UserActions from '../users/user.actions';

describe('UserListComponent', () => {
    let component: UserListComponent;
    let fixture: ComponentFixture<UserListComponent>;
    let store: MockStore<AppState>;
    let dispatchSpy: jasmine.Spy;
    let mockSelectAll: MemoizedSelector<AppState, ReadonlyArray<UserProfile>>;
    let mockSelectLoading: MemoizedSelector<AppState, boolean>;
    let mockSelectError: MemoizedSelector<AppState, string | null>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [UserListComponent],
            providers: [provideMockStore()]
        }).compileComponents();

        store = TestBed.inject(MockStore);
        dispatchSpy = spyOn(store, 'dispatch');

        mockSelectAll = store.overrideSelector(selectAllUsers, [] as ReadonlyArray<UserProfile>);
        mockSelectLoading = store.overrideSelector(selectUserLoading, false);
        mockSelectError = store.overrideSelector(selectUserError, null);

        fixture = TestBed.createComponent(UserListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should dispatch loadUsers on init', () => {
        expect(dispatchSpy).toHaveBeenCalledWith(UserActions.loadUsers());
    });

    it('should dispatch loadUsers on reload', () => {
        dispatchSpy.calls.reset();
        component.reload();
        expect(dispatchSpy).toHaveBeenCalledWith(UserActions.loadUsers());
    });

    afterEach(() => {
        mockSelectAll.release();
        mockSelectLoading.release();
        mockSelectError.release();
    });
});
