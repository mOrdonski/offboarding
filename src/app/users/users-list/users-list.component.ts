import { AsyncPipe } from '@angular/common';
import {
  Component,
  computed,
  inject,
  OnDestroy,
  OnInit,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { debounceTime, tap } from 'rxjs';

import { UsersActions } from '../../data-access/users/users.actions';
import { selectUsers } from '../../data-access/users/users.selectors';
import { User } from '../../shared/interfaces/user.dto';

@Component({
  selector: 'app-users-list',
  imports: [
    MatTabsModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    RouterLink,
    ReactiveFormsModule,
    AsyncPipe,
    MatSortModule,
  ],
  templateUrl: './users-list.component.html',
})
export class UsersListComponent implements OnInit, OnDestroy {
  private readonly store = inject(Store);

  users: Signal<User[]> = this.store.selectSignal(selectUsers);
  columns: Signal<string[]> = signal([
    'name',
    'email',
    'department',
    'equipment',
    'status',
    'actions',
  ]);

  searchForm = new FormGroup({
    search: new FormControl(''),
  });

  searchChanges$ = this.searchForm.get('search')?.valueChanges.pipe(
    debounceTime(300),
    tap((res: any) => this.searchTerm.set(res)),
  );

  searchTerm: WritableSignal<string> = signal('');
  sort: WritableSignal<{ active: string; direction: string }> = signal({
    active: '',
    direction: '',
  });

  usersSortedFiltered: Signal<User[]> = computed(() => {
    const search = this.searchTerm();
    const sort = this.sort();
    const filtered = this.users().filter((user: any) => {
      return (
        user.name.trim().toLowerCase().includes(search.trim().toLowerCase()) ||
        user.email.trim().toLowerCase().includes(search.trim().toLowerCase())
      );
    });
    return filtered.sort((a: any, b: any) => {
      if (sort.direction === '') {
        return 0;
      }
      if (sort.direction === 'asc') {
        return a[sort.active] > b[sort.active] ? 1 : -1;
      } else {
        return a[sort.active] < b[sort.active] ? 1 : -1;
      }
    });
  });

  sortChange({
    active,
    direction,
  }: {
    active: string;
    direction: string;
  }): void {
    this.sort.set({ active, direction });
  }

  ngOnInit(): void {
    this.store.dispatch(UsersActions.enterUsersList());
  }

  ngOnDestroy(): void {
    this.store.dispatch(UsersActions.leaveUsersList());
  }
}
