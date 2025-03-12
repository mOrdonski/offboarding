import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./users/users-list/users-list.component').then(
        (m) => m.UsersListComponent,
      ),
  },
];
