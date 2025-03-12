import { createFeature, createReducer, on } from '@ngrx/store';

import { User } from '../../shared/interfaces/user.dto';
import { UsersActions } from './users.actions';

export interface Users {
  users: User[];
}

const initialState: Users = {
  users: [],
};

export const usersFeature = createFeature({
  name: 'users',
  reducer: createReducer(
    initialState,

    on(UsersActions.fetchUsersSuccess, (state, { users }) => ({
      ...state,
      users,
    })),
  ),
});
