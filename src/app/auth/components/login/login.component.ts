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
    private readonly service: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.createForm();
    if (this.service.isLoggedIn) {
      console.log('User logged-in');
    } else {
      console.log('Token not found');
    }
  }

  userLogin() {
    const user: UserLogin = this.loginForm.value;
    console.log(user, '--User login form data');
    this.service.logIn(user.username, user.password).subscribe(
      (data) => {
        console.log(data, '--response data');
      },
      (error) => {
        console.log(error);
      },
      () => {
        alert('connected');
        this.service.get(user.username).subscribe((data) => {
          console.log(data);
          this.snackBar.openFromComponent(LoginSnackComponent, { duration: 2000 });

          localStorage.setItem('userDetails', JSON.stringify(data));
          this.router.navigate(['book-list']).then();
        });
      }
    );
  }
}
