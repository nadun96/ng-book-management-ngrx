import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { UserProfile } from '../models/userprofile';
import * as UserActions from './user.actions';

export interface UserEntityState extends EntityState<UserProfile> {
    loading: boolean;
    error: string | null;
}

export const userAdapter: EntityAdapter<UserProfile> = createEntityAdapter<UserProfile>();

export const initialState: UserEntityState = userAdapter.getInitialState({
    loading: false,
    error: null
});

export const userReducer = createReducer(
    initialState,
    on(UserActions.loadUsers, (state) => ({
        ...state,
        loading: true,
        error: null
    })),
    on(UserActions.loadUsersSuccess, (state, { users }) =>
        userAdapter.setAll(users, {
            ...state,
            loading: false,
            error: null
        })
    ),
    on(UserActions.loadUsersFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error: error instanceof Error ? error.message : String(error)
    })),
    on(UserActions.upsertUserSuccess, (state, { profile }) =>
        userAdapter.upsertOne(profile, {
            ...state,
            loading: false,
            error: null
        })
    ),
    on(UserActions.upsertUserFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error: error instanceof Error ? error.message : String(error)
    })),
    on(UserActions.deactivateUserSuccess, (state, { userId }) =>
        userAdapter.removeOne(userId, {
            ...state,
            loading: false,
            error: null
        })
    ),
    on(UserActions.deactivateUserFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error: error instanceof Error ? error.message : String(error)
    }))
);
