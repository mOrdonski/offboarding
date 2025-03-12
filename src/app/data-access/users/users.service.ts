import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { User } from '../../shared/interfaces/user.dto';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private readonly http: HttpClient = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/users/';

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  getUser(id: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}${id}`);
  }
}
