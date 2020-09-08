import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../models/user';
import { UserLogin } from '../../models/userLogin';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  fulfilled() {
    console.log('Fulfilled');
  }

  rejected() {
    console.log('Rejected');
  }

  createForm() {
    this.loginForm = this.fb.group({
      username: [''],
      password: [''],
    });
  }

  constructor(private fb: FormBuilder, private readonly service: AuthService, private router: Router) {}

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
    this.service.logIn(user.username, user.password).subscribe((data) => {
      console.log(data, '--response data');
      this.router.navigate(['book-list']).then();
    });
  }
}
