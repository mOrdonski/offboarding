import { Component, inject, OnDestroy, OnInit, Signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';

import { selectRouteParam } from '../../data-access/router/router.selectors';
import { UsersActions } from '../../data-access/users/users.actions';
import { selectSelectedUser } from '../../data-access/users/users.selectors';
import { UserStatus } from '../../shared/enums/user-status.enum';
import { User } from '../../shared/interfaces/user.dto';

@Component({
  selector: 'app-user-details',
  imports: [MatIconModule, MatButtonModule, RouterLink, MatDialogModule],
  templateUrl: './user-details.component.html',
})
export class UserDetailsComponent implements OnInit, OnDestroy {
  private readonly store = inject(Store);
  readonly dialog = inject(MatDialog);
  userId: Signal<string | undefined> = this.store.selectSignal(
    selectRouteParam('userId'),
  );
  user: Signal<User> = this.store.selectSignal(selectSelectedUser);
  UserStatus = UserStatus;

  openOffboardingDialog(): void {}

  ngOnInit(): void {
    this.store.dispatch(UsersActions.enterUserDetails());
  }
  ngOnDestroy(): void {
    this.store.dispatch(UsersActions.leaveUserDetails());
  }
}
