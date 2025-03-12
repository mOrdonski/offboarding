import { createFeature, createReducer, on } from '@ngrx/store';

import { User } from '../../shared/interfaces/user.dto';
import { UsersActions } from './users.actions';

export interface Users {
  users: User[];
  selectedUser: User;
}

const initialState: Users = {
  users: [],
  selectedUser: {} as User,
};

export const usersFeature = createFeature({
  name: 'users',
  reducer: createReducer(
    initialState,

    on(UsersActions.fetchUsersSuccess, (state, { users }) => ({
      ...state,
      users,
    })),

    on(UsersActions.fetchUserSuccess, (state, { user }) => ({
      ...state,
      selectedUser: user,
    })),
  ),
});
