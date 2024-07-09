import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService, AuthToken } from '../services/auth/auth.service';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [FormsModule, MatCardModule, MatProgressSpinnerModule, CommonModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
})
export class SettingsComponent implements OnInit {
  constructor(private authService: AuthService) {}

  showSpinner: boolean = true;
  public tokenFromApi: string = '';

  ngOnInit(): void {
    this.authService.getAuthToken().subscribe({
      next: (data: AuthToken) => {
        this.tokenFromApi = data.access_token;
        this.showSpinner = false;
      },
      error: (error) => {
        console.error('There was an error!', error);
        this.showSpinner = false;
      },
    });
  }

  saveAuthData() {
    localStorage.setItem('authToken', this.tokenFromApi);
  }
}
