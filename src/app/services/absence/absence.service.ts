import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { getHeaders } from '../utils';

export interface Absence {
  UserId: string;
  PartialTimeFrom: string;
  PartialTimeTo: string;
  AbsenceDefinitionId: string;
}

export interface AbsenceDefiniton {
  Id: string;
  Name: string;
}

interface AddAbsenceDTO {
  UserId: string;
  Timestamp: string;
  PartialTimeFrom: string;
  PartialTimeTo: string;
  Origin: number;
  IsPartial: boolean;
  OverrideHolidayAbsence: boolean;
  AbsenceDefinitionId: string;
}

export interface GetAbsencesPayload {
  dateFrom: string;
  dateTo: string;
}

@Injectable({
  providedIn: 'root',
})
export class AbsenceService {
  private baseUrl = 'https://api4.allhours.com/api/v1/absences';

  constructor(private http: HttpClient) {}

  getAbsenceDefinitions(): Observable<any> {
    return this.http.get(
      'https://api4.allhours.com/api/v1/absencedefinitions',
      {
        headers: getHeaders(),
      }
    );
  }

  getAbsences(payload: GetAbsencesPayload): Observable<Absence[]> {
    return this.http.get<Absence[]>(`${this.baseUrl}`, {
      params: { dateFrom: payload.dateFrom, dateTo: payload.dateTo },
      headers: getHeaders(),
    });
  }

  addAbsence(absence: Absence): Observable<void> {
    const payload: AddAbsenceDTO = {
      ...absence,
      Origin: 1,
      IsPartial: true,
      OverrideHolidayAbsence: false,
      Timestamp: new Date().toISOString(),
    };
    return this.http.post<void>(`${this.baseUrl}`, payload, {
      headers: getHeaders(),
    });
  }
}
