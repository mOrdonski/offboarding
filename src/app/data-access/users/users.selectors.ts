import { createSelector } from '@ngrx/store';

import { usersFeature } from './users.reducer';

export const { selectUsers } = usersFeature;

export const selectUserById = (userId: string) =>
  createSelector(selectUsers, (users) =>
    users.find((user) => user.id === userId),
  );
