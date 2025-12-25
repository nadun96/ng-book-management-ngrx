import { createAction, props } from '@ngrx/store';
import { UserProfile } from '../models/userprofile';

export const loadUsers = createAction('[User] Load Users');

export const loadUsersSuccess = createAction(
    '[User] Load Users Success',
    props<{ users: UserProfile[] }>()
);

export const loadUsersFailure = createAction(
    '[User] Load Users Failure',
    props<{ error: unknown }>()
);

export const upsertUser = createAction(
    '[User] Upsert User',
    props<{ profile: UserProfile }>()
);

export const upsertUserSuccess = createAction(
    '[User] Upsert User Success',
    props<{ profile: UserProfile }>()
);

export const upsertUserFailure = createAction(
    '[User] Upsert User Failure',
    props<{ error: unknown }>()
);

export const deactivateUser = createAction(
    '[User] Deactivate User',
    props<{ userId: string }>()
);

export const deactivateUserSuccess = createAction(
    '[User] Deactivate User Success',
    props<{ userId: string }>()
);

export const deactivateUserFailure = createAction(
    '[User] Deactivate User Failure',
    props<{ error: unknown }>()
);
