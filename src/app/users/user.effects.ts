import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import * as UserActions from './user.actions';
import { UserService } from './user.service';

@Injectable()
export class UserEffects {
    loadUsers$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UserActions.loadUsers),
            mergeMap(() =>
                this.userService.getUsers().pipe(
                    map((users) => UserActions.loadUsersSuccess({ users })),
                    catchError((error) => of(UserActions.loadUsersFailure({ error })))
                )
            )
        )
    );

    upsertUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UserActions.upsertUser),
            mergeMap(({ profile }) =>
                this.userService.upsertUser(profile).pipe(
                    map((updated) => UserActions.upsertUserSuccess({ profile: updated })),
                    catchError((error) => of(UserActions.upsertUserFailure({ error })))
                )
            )
        )
    );

    deactivateUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UserActions.deactivateUser),
            mergeMap(({ userId }) =>
                this.userService.deactivateUser(userId).pipe(
                    map(() => UserActions.deactivateUserSuccess({ userId })),
                    catchError((error) => of(UserActions.deactivateUserFailure({ error })))
                )
            )
        )
    );

    constructor(
        private readonly actions$: Actions,
        private readonly userService: UserService
    ) { }
}
