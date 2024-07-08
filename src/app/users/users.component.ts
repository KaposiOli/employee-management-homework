import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { User, UserService } from '../services/user/user.service';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { AddAbsenceComponent } from '../add-absence/add-absence.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent {
  users: User[] = [];
  newUser: User = {
    FirstName: '',
    LastName: '',
    Email: '',
  };
  filteredUsers: User[] = [];
  searchTerm: string = '';
  showSpinner: boolean = true;

  displayedColumns: string[] = [
    'Id',
    'Email',
    'FirstName',
    'LastName',
    'Actions',
  ];

  constructor(private userService: UserService) {}

  readonly dialog = inject(MatDialog);

  ngOnInit(): void {
    this.getUsers();
  }

  openDialog(userRow: User): void {
    this.dialog.open(AddAbsenceComponent, {
      height: '400px',
      width: '600px',
      data: userRow,
    });
  }

  //no pagination
  getUsers() {
    this.showSpinner = true;
    this.userService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
        this.filteredUsers = users;
        this.showSpinner = false;
      },
      error: (error) => {
        console.error('There was an error!', error);
        this.showSpinner = false;
      },
    });
  }

  //no validation for empty fields or field with invalid data
  addUser(): void {
    this.showSpinner = true;
    this.userService.addUser(this.newUser).subscribe({
      next: () => {
        this.getUsers();
        this.newUser = {
          FirstName: '',
          LastName: '',
          Email: '',
        };
      },
      error: (error) => {
        console.error('There was an error!', error);
        this.showSpinner = false;
      },
    });
  }

  searchUsers(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredUsers = this.users.filter(
      (user) =>
        user.FirstName.toLowerCase().includes(term) ||
        user.LastName.toLowerCase().includes(term)
    );
  }
}
