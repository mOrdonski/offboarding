import { provideEffects } from '@ngrx/effects';
import {
  NavigationActionTiming,
  provideRouterStore,
  routerReducer,
} from '@ngrx/router-store';
import { provideState, provideStore } from '@ngrx/store';

import { UsersEffects } from './data-access/users/users.effects';
import { usersFeature } from './data-access/users/users.reducer';

export const APP_STORE_PROVIDERS = [
  provideStore(),

  provideState(usersFeature),

  provideEffects([UsersEffects]),

  provideStore(
    {
      router: routerReducer,
    },
    {
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
        strictStateSerializability: false,
        strictActionSerializability: false,
        strictActionWithinNgZone: false,
        strictActionTypeUniqueness: true,
      },
    },
  ),

  provideRouterStore({
    navigationActionTiming: NavigationActionTiming.PostActivation,
  }),
];
