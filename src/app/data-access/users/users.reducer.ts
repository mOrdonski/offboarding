import { createFeature, createReducer, on } from '@ngrx/store';

import { UserStatus } from '../../shared/enums/user-status.enum';
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

    on(UsersActions.offboardUserSuccess, (state) => ({
      ...state,
      selectedUser: {
        ...state.selectedUser,
        status: UserStatus.OFFBOARDED,
      },
      users: state.users.map((user: User) =>
        user.id === state.selectedUser.id
          ? { ...user, status: UserStatus.OFFBOARDED }
          : user,
      ),
    })),
  ),
});
