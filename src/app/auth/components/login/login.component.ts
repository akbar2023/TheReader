import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { UserLogin } from '../../models/userLogin';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpResponse } from '@angular/common/http';

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
  }

  userLogin() {
    const user: UserLogin = this.loginForm.value;
    console.log(user, '--User login form data');
    this.authService.logIn(user.username, user.password).subscribe(
      (data: HttpResponse<any>) => {
        console.log(data, '--response data');
        if (data.status === 200) {
          localStorage.setItem('userDetails', JSON.stringify(data.body));
          const userDetString = localStorage.getItem('userDetails');
          this.authService.isLoggedIn = true;
          this.authService.userDetails = JSON.parse(userDetString);
          this.snackBar.open(`Welcome ${this.authService.userDetails.firstName}!`, null, {
            duration: 3000,
            verticalPosition: 'top',
            panelClass: ['green-snackbar'],
          });
        } else {
          this.snackBar.open(`Incorrect email or password.`, null, {
            duration: 5000,
            verticalPosition: 'top',
            panelClass: ['orange-snackbar'],
          });
        }
      },
      (error) => {
        console.log(error, 'login error');
      },
      () => {
        console.log('login request complete!');
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
