import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  hide = true;

  get password(): AbstractControl {
    return this.loginForm.get('password');
  }

  get username(): AbstractControl {
    return this.loginForm.get('username');
  }

  constructor(
    private fb: FormBuilder,
    private readonly authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  createForm(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  ngOnInit(): void {
    this.createForm();
  }

  userLogin(): void {
    const user: UserLogin = this.loginForm.value;
    this.authService.logIn(user.username, user.password).subscribe(
      (data: HttpResponse<any>) => {
        if (data.status === 200) {
          localStorage.setItem('userDetails', JSON.stringify(data.body));
          const userDetString = localStorage.getItem('userDetails');
          this.authService.isLoggedIn = true;
          this.authService.userDetails = JSON.parse(userDetString);
          this.snackBar.open(`Welcome ${this.authService.userDetails.firstName}!`, null, {
            duration: 2000,
            verticalPosition: 'top',
            panelClass: ['green-snackbar'],
          });
        } else {
          this.snackBar.open(`Incorrect email or password.`, null, {
            duration: 2000,
            verticalPosition: 'top',
            panelClass: ['orange-snackbar'],
          });
        }
      },
      () => {
        this.snackBar.open(`Unexpected Error`, null, {
          duration: 2000,
          verticalPosition: 'top',
          panelClass: ['orange-snackbar'],
        });
      },
      () => {}
    );
  }

  requiredMessage(field: string): string {
    return `Enter your ${field} please`;
  }
}
