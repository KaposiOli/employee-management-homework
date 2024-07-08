import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

export interface AuthToken {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  getAuthToken(): Observable<AuthToken> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    const body = new HttpParams()
      .set('grant_type', 'client_credentials')
      .set('client_id', environment.clientId as string)
      .set('client_secret', environment.clientSecret as string)
      .set('scope', 'api');

    return this.http.post<AuthToken>('/connect/token', body.toString(), {
      headers,
    });
  }
}
