import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService, AuthToken } from '../services/auth/auth.service';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [FormsModule, MatCardModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
})
export class SettingsComponent implements OnInit {
  constructor(private authService: AuthService) {}

  public tokenFromApi: string = '';

  ngOnInit(): void {
    this.authService.getAuthToken().subscribe({
      next: (data: AuthToken) => {
        this.tokenFromApi = data.access_token;
      },
      error: (error) => {
        console.error('There was an error!', error);
      },
    });
  }

  saveAuthData() {
    localStorage.setItem('authToken', this.tokenFromApi);
  }
}
