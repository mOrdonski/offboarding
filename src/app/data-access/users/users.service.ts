import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { OffboardRequestBody } from '../../shared/interfaces/offboard-request-body.dto';
import { OffboardResponse } from '../../shared/interfaces/offboard-response.dto';
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

  offboardUser(
    userId: string,
    data: OffboardRequestBody,
  ): Observable<OffboardResponse> {
    return this.http.post<any>(`${this.apiUrl}${userId}/offboard`, data);
  }
}
