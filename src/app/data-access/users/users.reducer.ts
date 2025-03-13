import { createFeature, createReducer, on } from '@ngrx/store';

import { UserStatus } from '../../shared/enums/user-status.enum';
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

    on(UsersActions.offboardUserSuccess, (state, { userId }) => ({
      ...state,

      users: state.users.map((user: User) =>
        user.id === userId ? { ...user, status: UserStatus.OFFBOARDED } : user,
      ),
    })),
  ),
});
