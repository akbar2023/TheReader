import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { UserLogin } from '../../models/userLogin';
import { MatSnackBar } from '@angular/material/snack-bar';
import { concatMap } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  createForm() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  constructor(
    private fb: FormBuilder,
    private readonly authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.createForm();
    if (this.authService.isLoggedIn) {
      console.log('User logged-in');
    } else {
      console.log('Token not found');
    }
  }

  userLogin() {
    const user: UserLogin = this.loginForm.value;
    console.log(user, '--User login form data');
    this.authService.logIn(user.username, user.password).subscribe(
      (data) => {
        console.log(data.status, '--response data');
        alert('connected');
      },
      (error) => {
        console.log(error.status);
      },
      () => {
        this.authService.getUser(user.username).subscribe((data) => {
          console.log(data, '--userDetails');

          localStorage.setItem('userDetails', JSON.stringify(data));
          const userDetString = localStorage.getItem('userDetails');
          this.authService.isLoggedIn = true;
          this.authService.userDetails = JSON.parse(userDetString);
          this.snackBar.open(`Welcome ${this.authService.userDetails.firstName}!`, null, {
            duration: 3000,
            verticalPosition: 'top',
            panelClass: ['green-snackbar'],
          });
          this.router.navigate(['home']).then();
        });
      }
    );
  }

  get password() {
    return this.loginForm.get('password');
  }

  get username() {
    return this.loginForm.get('username');
  }

  requiredMessage(field: string) {
    return `Enter your ${field} please`;
  }
}
