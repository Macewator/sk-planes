import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  credentials = {
    email: '' , 
    password: '' 
  };

  constructor(
    private authService: AuthService,
    private router: Router,
    private toast: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  login(): void {
    this.authService.login(this.credentials)
      .then(this.onLoginSuccess.bind(this), this.onFailur.bind(this));
  }

  register(): void {
    this.authService.register(this.credentials)
      .then(this.onRegisterSuccess.bind(this), this.onFailur.bind(this));
  }

  private onLoginSuccess(): void {
    this.router.navigate(['/dashboard']);
    this.toast.open('You have successfully log in', '', { panelClass: 'toast-success' });
  }

  private onRegisterSuccess(): void {
    this.toast.open('You have successfully registered, please log in', '', { panelClass: 'toast-success' });
  }
 

  private onFailur(error): void {
    this.toast.open(error.message, '', { panelClass: 'toast-error' });
  }
}
