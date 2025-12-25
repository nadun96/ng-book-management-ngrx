import { userReducer, initialState, userAdapter } from './user.reducer';
import * as UserActions from './user.actions';
import { UserProfile } from '../models/userprofile';

const buildUser = (override: Partial<UserProfile> = {}): UserProfile => ({
    id: 'user-1',
    displayName: 'Ada Lovelace',
    email: 'ada@example.com',
    role: 'admin',
    ...override
});

describe('UserReducer', () => {
    it('should return the initial state by default', () => {
        const state = userReducer(undefined, { type: '@@init' } as any);
        expect(state).toEqual(initialState);
    });

    it('should set loading true on loadUsers', () => {
        const state = userReducer(initialState, UserActions.loadUsers());
        expect(state.loading).toBeTrue();
        expect(state.error).toBeNull();
    });

    it('should populate users on loadUsersSuccess', () => {
        const users = [buildUser(), buildUser({ id: 'user-2', displayName: 'Grace Hopper' })];
        const state = userReducer(initialState, UserActions.loadUsersSuccess({ users }));
        expect(userAdapter.getSelectors().selectAll(state)).toEqual(users);
        expect(state.loading).toBeFalse();
        expect(state.error).toBeNull();
    });

    it('should store error on loadUsersFailure', () => {
        const error = 'network issue';
        const state = userReducer(initialState, UserActions.loadUsersFailure({ error }));
        expect(state.loading).toBeFalse();
        expect(state.error).toContain('network issue');
    });

    it('should upsert user on upsertUserSuccess', () => {
        const profile = buildUser();
        const state = userReducer(initialState, UserActions.upsertUserSuccess({ profile }));
        const entities = userAdapter.getSelectors().selectEntities(state);
        expect(entities[profile.id]).toEqual(profile);
    });

    it('should remove user on deactivateUserSuccess', () => {
        const populated = userReducer(
            initialState,
            UserActions.loadUsersSuccess({ users: [buildUser()] })
        );

        const state = userReducer(populated, UserActions.deactivateUserSuccess({ userId: 'user-1' }));
        expect(userAdapter.getSelectors().selectAll(state)).toEqual([]);
    });
});
