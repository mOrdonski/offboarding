import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatLatestFrom } from '@ngrx/operators';
import { Store } from '@ngrx/store';
import { catchError, map, of, switchMap, take, takeUntil } from 'rxjs';

import { OffboardRequestBody } from '../../shared/interfaces/offboard-request-body.dto';
import { User } from '../../shared/interfaces/user.dto';
import { selectRouteParam } from '../router/router.selectors';
import { UsersActions } from './users.actions';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root',
})
export class UsersEffects {
  private readonly store = inject(Store);
  private readonly actions$ = inject(Actions);
  private readonly usersService = inject(UsersService);

  fetchUsersOnEnterList$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UsersActions.enterUsersList),
      map(() => UsersActions.fetchUsers()),
      takeUntil(this.actions$.pipe(ofType(UsersActions.leaveUsersList))),
    );
  });

  fetchUserOnEnterUserDetails$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UsersActions.enterUserDetails),
      concatLatestFrom(() => this.store.select(selectRouteParam('userId'))),
      map(([, userId]) => UsersActions.fetchUser({ userId: userId as string })),
    );
  });

  fetchUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UsersActions.fetchUser),
      switchMap(({ userId }: { userId: string }) =>
        this.usersService.getUser(userId).pipe(
          map((user) => UsersActions.fetchUserSuccess({ user })),
          catchError(() => of(UsersActions.fetchUserFailure())),
        ),
      ),
    );
  });

  fetchUsers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UsersActions.fetchUsers),
      take(1),
      switchMap(() =>
        this.usersService.getUsers().pipe(
          map((users: User[]) => UsersActions.fetchUsersSuccess({ users })),
          catchError(() => of(UsersActions.fetchUsersFailure())),
        ),
      ),
    );
  });

  offboardUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UsersActions.offboardUser),
      switchMap(
        ({ userId, data }: { userId: string; data: OffboardRequestBody }) =>
          this.usersService.offboardUser(userId, data).pipe(
            map(() => UsersActions.offboardUserSuccess()),
            catchError(() => of(UsersActions.offboardUserFailure())),
          ),
      ),
    );
  });
}
