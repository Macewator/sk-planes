import { Component, OnInit } from '@angular/core';
import { UserInfo } from 'firebase';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  userName: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toast: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.showUserEmail()
  }

  showUserEmail(): void {
    this.userName = this.authService.user.email;
  }

  logout(): void {
    this.authService.logout()
      .then(this.onSuccess.bind(this), this.onFailur.bind(this));
  }

  private onSuccess(): void {
    this.router.navigate(['/login']);
    this.toast.open('You have successfully log out', '', { panelClass: 'toast-success' });
  }

  private onFailur(error): void {
    this.toast.open(error.message, '', { panelClass: 'toast-error' });
  }
}
