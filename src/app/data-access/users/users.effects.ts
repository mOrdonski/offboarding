import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, take, takeUntil } from 'rxjs';

import { OffboardRequestBody } from '../../shared/interfaces/offboard-request-body.dto';
import { User } from '../../shared/interfaces/user.dto';
import { UsersActions } from './users.actions';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root',
})
export class UsersEffects {
  private readonly actions$ = inject(Actions);
  private readonly usersService = inject(UsersService);

  fetchUsersOnEnterList$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UsersActions.enterUsersList),
      map(() => UsersActions.fetchUsers()),
      takeUntil(this.actions$.pipe(ofType(UsersActions.leaveUsersList))),
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
            map(() => UsersActions.offboardUserSuccess({ userId })),
            catchError(() => of(UsersActions.offboardUserFailure())),
          ),
      ),
    );
  });
}
