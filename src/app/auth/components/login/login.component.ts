import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { UserLogin } from '../../models/userLogin';
import { LoginSnackComponent } from '../login-snack/login-snack.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  createForm() {
    this.loginForm = this.fb.group({
      username: [''],
      password: [''],
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
        console.log(data, '--response data');
        alert('connected');
      },
      (error) => {
        console.log(error);
      },
      () => {
        this.authService.getUser(user.username).subscribe((data) => {
          console.log(data);

          localStorage.setItem('userDetails', JSON.stringify(data));
          const userDetString = localStorage.getItem('userDetails');
          this.authService.isLoggedIn = true;
          this.authService.userDetails = JSON.parse(userDetString);
          this.snackBar.openFromComponent(LoginSnackComponent, { duration: 3000, verticalPosition: 'top' });
          this.router.navigate(['book-list']).then();
        });
      }
    );
  }
}
