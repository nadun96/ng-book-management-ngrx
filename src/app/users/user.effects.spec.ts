import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, ReplaySubject, of, throwError } from 'rxjs';
import { UserEffects } from './user.effects';
import * as UserActions from './user.actions';
import { UserService } from './user.service';
import { UserProfile } from '../models/userprofile';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { take } from 'rxjs/operators';

describe('UserEffects', () => {
    let actions$: Observable<unknown>;
    let effects: UserEffects;
    let userService: jasmine.SpyObj<UserService>;

    const user: UserProfile = {
        id: 'user-1',
        displayName: 'Ada Lovelace',
        email: 'ada@example.com',
        role: 'admin'
    };

    beforeEach(() => {
        userService = jasmine.createSpyObj<UserService>('UserService', [
            'getUsers',
            'upsertUser',
            'deactivateUser'
        ]);

        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                UserEffects,
                provideMockActions(() => actions$),
                { provide: UserService, useValue: userService }
            ]
        });

        effects = TestBed.inject(UserEffects);
    });

    describe('loadUsers$', () => {
        it('should emit loadUsersSuccess on success', (done) => {
            userService.getUsers.and.returnValue(of([user]));

            const subject = new ReplaySubject(1);
            subject.next(UserActions.loadUsers());
            actions$ = subject.asObservable();

            effects.loadUsers$.pipe(take(1)).subscribe((result) => {
                expect(result).toEqual(UserActions.loadUsersSuccess({ users: [user] }));
                done();
            });
        });

        it('should emit loadUsersFailure on error', (done) => {
            userService.getUsers.and.returnValue(throwError(() => 'boom'));

            const subject = new ReplaySubject(1);
            subject.next(UserActions.loadUsers());
            actions$ = subject.asObservable();

            effects.loadUsers$.pipe(take(1)).subscribe((result) => {
                expect(result).toEqual(UserActions.loadUsersFailure({ error: 'boom' }));
                done();
            });
        });
    });

    describe('upsertUser$', () => {
        it('should emit upsertUserSuccess', (done) => {
            userService.upsertUser.and.returnValue(of(user));

            const subject = new ReplaySubject(1);
            subject.next(UserActions.upsertUser({ profile: user }));
            actions$ = subject.asObservable();

            effects.upsertUser$.pipe(take(1)).subscribe((result) => {
                expect(result).toEqual(UserActions.upsertUserSuccess({ profile: user }));
                done();
            });
        });

        it('should emit upsertUserFailure on error', (done) => {
            userService.upsertUser.and.returnValue(throwError(() => 'boom'));

            const subject = new ReplaySubject(1);
            subject.next(UserActions.upsertUser({ profile: user }));
            actions$ = subject.asObservable();

            effects.upsertUser$.pipe(take(1)).subscribe((result) => {
                expect(result).toEqual(UserActions.upsertUserFailure({ error: 'boom' }));
                done();
            });
        });
    });

    describe('deactivateUser$', () => {
        it('should emit deactivateUserSuccess', (done) => {
            userService.deactivateUser.and.returnValue(of(void 0));

            const subject = new ReplaySubject(1);
            subject.next(UserActions.deactivateUser({ userId: user.id }));
            actions$ = subject.asObservable();

            effects.deactivateUser$.pipe(take(1)).subscribe((result) => {
                expect(result).toEqual(UserActions.deactivateUserSuccess({ userId: user.id }));
                done();
            });
        });

        it('should emit deactivateUserFailure on error', (done) => {
            userService.deactivateUser.and.returnValue(throwError(() => 'boom'));

            const subject = new ReplaySubject(1);
            subject.next(UserActions.deactivateUser({ userId: user.id }));
            actions$ = subject.asObservable();

            effects.deactivateUser$.pipe(take(1)).subscribe((result) => {
                expect(result).toEqual(UserActions.deactivateUserFailure({ error: 'boom' }));
                done();
            });
        });
    });
});
