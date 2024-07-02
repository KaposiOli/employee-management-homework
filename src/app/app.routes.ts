import { Routes } from '@angular/router';
import { SettingsComponent } from './settings/settings.component';

export const routes: Routes = [
  { path: 'settings', component: SettingsComponent },
  { path: '', redirectTo: '/settings', pathMatch: 'full' },
];
