import { AsyncPipe } from '@angular/common';
import {
  Component,
  computed,
  inject,
  OnDestroy,
  OnInit,
  Signal,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, Observable, tap } from 'rxjs';

import { selectRouteParam } from '../../data-access/router/router.selectors';
import { UsersActions } from '../../data-access/users/users.actions';
import { selectUserById } from '../../data-access/users/users.selectors';
import { OffboardUserDialogComponent } from '../../dialogs/offboard-user-dialog/offboard-user-dialog.component';
import { UserStatus } from '../../shared/enums/user-status.enum';
import { OffboardRequestBody } from '../../shared/interfaces/offboard-request-body.dto';
import { User } from '../../shared/interfaces/user.dto';

@Component({
  selector: 'app-user-details',
  imports: [
    MatIconModule,
    MatButtonModule,
    RouterLink,
    MatDialogModule,
    AsyncPipe,
  ],
  templateUrl: './user-details.component.html',
})
export class UserDetailsComponent implements OnInit, OnDestroy {
  private readonly store = inject(Store);
  readonly dialog = inject(MatDialog);
  userId: Signal<string | undefined> = this.store.selectSignal(
    selectRouteParam('userId'),
  );
  user: Signal<User> = computed(
    () =>
      this.store.selectSignal(
        selectUserById(this.userId() as string),
      )() as User,
  );

  offboardingDialogClosed$: Observable<OffboardRequestBody> =
    new Observable<OffboardRequestBody>();
  UserStatus = UserStatus;

  openOffboardingDialog(): void {
    const dialogRef = this.dialog.open(OffboardUserDialogComponent);

    this.offboardingDialogClosed$ = dialogRef.afterClosed().pipe(
      filter(Boolean),
      tap((data: OffboardRequestBody) => {
        this.store.dispatch(
          UsersActions.offboardUser({ userId: this.userId()!, data }),
        );
      }),
    );
  }

  ngOnInit(): void {
    this.store.dispatch(UsersActions.enterUserDetails());
  }
  ngOnDestroy(): void {
    this.store.dispatch(UsersActions.leaveUserDetails());
  }
}
