import { HttpHeaders } from '@angular/common/http';

export function getHeaders(): HttpHeaders {
  const token = localStorage.getItem('authToken');
  return new HttpHeaders({
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  });
}
