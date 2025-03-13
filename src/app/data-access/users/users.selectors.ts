import { createSelector } from '@ngrx/store';

import { usersFeature } from './users.reducer';

export const { selectUsers, selectSelectedUserId } = usersFeature;

export const selectUserById = (userId: string) =>
  createSelector(selectUsers, (users) =>
    users.find((user) => user.id === userId),
  );
