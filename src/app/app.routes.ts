import { Routes } from '@angular/router';
import { SettingsComponent } from './settings/settings.component';
import { UsersComponent } from './users/users.component';
import { AbsenceComponent } from './absence/absence.component';

export const routes: Routes = [
  { path: 'settings', component: SettingsComponent },
  { path: 'users', component: UsersComponent },
  { path: 'absence', component: AbsenceComponent },
  { path: '', redirectTo: '/settings', pathMatch: 'full' },
];
