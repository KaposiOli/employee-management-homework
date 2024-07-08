import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { getHeaders } from '../utils';

export interface User {
  FirstName: string;
  LastName: string;
  Email: string;
  Id?: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = 'https://api4.allhours.com/api/v1/users';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}`, {
      headers: getHeaders(),
    });
  }

  addUser(user: User): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}`, user, {
      headers: getHeaders(),
    });
  }
}
