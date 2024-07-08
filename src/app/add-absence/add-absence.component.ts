import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from '../services/user/user.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  MatNativeDateModule,
  provideNativeDateAdapter,
} from '@angular/material/core';
import {
  Absence,
  AbsenceDefiniton,
  AbsenceService,
} from '../services/absence/absence.service';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-add-absence',
  standalone: true,
  providers: [FormBuilder, provideNativeDateAdapter()],
  imports: [
    FormsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
  ],
  templateUrl: './add-absence.component.html',
  styleUrl: './add-absence.component.scss',
})
export class AddAbsenceComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public user: User,
    public dialogRef: MatDialogRef<AddAbsenceComponent>,
    private absenceService: AbsenceService
  ) {}

  readonly range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  absenceDefinitions: AbsenceDefiniton[] = [];
  selectedAbsenceDefinitionId: string | undefined;
  showSpinner: boolean = true;

  ngOnInit(): void {
    this.absenceService.getAbsenceDefinitions().subscribe({
      next: (absenceDefinitionsFromApi) => {
        this.absenceDefinitions = absenceDefinitionsFromApi;
        this.showSpinner = false;
      },
      error: (error) => {
        console.error('There was an error!', error);
        this.showSpinner = false;
      },
    });
  }

  onSave(): void {
    this.showSpinner = true;
    this.absenceService.addAbsence(this.createAddAbsencePayload()).subscribe({
      next: () => {
        this.showSpinner = false;
      },
      error: (error) => {
        console.error('There was an error!', error);
        this.showSpinner = false;
      },
    });
    this.dialogRef.close();
  }

  private createAddAbsencePayload(): Absence {
    return {
      UserId: this.user.Id as string,
      PartialTimeFrom: this.range.value.start!.toISOString(),
      PartialTimeTo: this.range.value.end!.toISOString(),
      AbsenceDefinitionId: this.selectedAbsenceDefinitionId!,
    };
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
