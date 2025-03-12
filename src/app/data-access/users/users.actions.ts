import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { User } from '../../shared/interfaces/user.dto';

export const UsersActions = createActionGroup({
  source: 'users',
  events: {
    'Enter Users List': emptyProps(),
    'Leave Users List': emptyProps(),

    'Fetch Users': emptyProps(),
    'Fetch Users Success': props<{ users: User[] }>(),
    'Fetch Users Failure': emptyProps(),
  },
});
