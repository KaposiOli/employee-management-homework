import { Component } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { Absence, AbsenceService } from '../services/absence/absence.service';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  MatNativeDateModule,
  provideNativeDateAdapter,
} from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-absence',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatProgressSpinnerModule,
    CommonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
  ],
  templateUrl: './absence.component.html',
  styleUrl: './absence.component.scss',
})
export class AbsenceComponent {
  constructor(private absenceService: AbsenceService) {}
  START_OFFSET = 2;
  END_OFFSET = 26;
  absences: Absence[] = [];
  showSpinner: boolean = false;
  displayedColumns: string[] = ['UserId', 'AbsenceDefinitionName'];

  onDateChange(event: any): void {
    this.getAbsencesForDate(event.value);
  }

  calculateDate(date: Date, startOrEnd: 'start' | 'end'): string {
    return new Date(
      date.setHours(
        startOrEnd === 'start' ? +this.START_OFFSET : +this.END_OFFSET
      )
    ).toISOString();
  }

  // absences/GET returns Absence[] for a given date, date being the timestamp of the absence rather than the PartialTimeFrom or PartialTimeTo parameter, is this intended?

  getAbsencesForDate(date: Date): void {
    this.showSpinner = true;
    this.absenceService
      .getAbsences({
        dateFrom: this.calculateDate(date, 'start'),
        dateTo: this.calculateDate(date, 'end'),
      })
      .subscribe({
        next: (absences) => {
          this.absences = absences;
          this.showSpinner = false;
        },
        error: (error) => {
          console.error('There was an error!', error);
          this.showSpinner = false;
        },
      });
  }
}
