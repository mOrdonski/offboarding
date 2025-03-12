import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { OffboardRequestBody } from '../../shared/interfaces/offboard-request-body.dto';
import { User } from '../../shared/interfaces/user.dto';

export const UsersActions = createActionGroup({
  source: 'users',
  events: {
    'Enter Users List': emptyProps(),
    'Leave Users List': emptyProps(),

    'Enter User Details': emptyProps(),
    'Leave User Details': emptyProps(),

    'Fetch User': props<{ userId: string }>(),
    'Fetch User Success': props<{ user: User }>(),
    'Fetch User Failure': emptyProps(),

    'Fetch Users': emptyProps(),
    'Fetch Users Success': props<{ users: User[] }>(),
    'Fetch Users Failure': emptyProps(),

    'Offboard User': props<{ userId: string; data: OffboardRequestBody }>(),
    'Offboard User Success': emptyProps(),
    'Offboard User Failure': emptyProps(),
  },
});
