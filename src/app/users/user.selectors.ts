import { createFeatureSelector, createSelector } from '@ngrx/store';
import { userAdapter, UserEntityState } from './user.reducer';

export const USER_FEATURE_KEY = 'users';

export const selectUserState = createFeatureSelector<UserEntityState>(USER_FEATURE_KEY);

const {
    selectAll,
    selectEntities,
    selectIds
} = userAdapter.getSelectors(selectUserState);

export const selectAllUsers = selectAll;

export const selectUserEntities = selectEntities;

export const selectUserIds = selectIds;

export const selectUserById = (userId: string) =>
    createSelector(selectUserEntities, (entities) => entities[userId] ?? null);

export const selectUserLoading = createSelector(
    selectUserState,
    (state) => state.loading
);

export const selectUserError = createSelector(
    selectUserState,
    (state) => state.error
);
