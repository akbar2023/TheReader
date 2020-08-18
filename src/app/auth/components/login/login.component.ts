import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../models/user';

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

  constructor(private fb: FormBuilder, private readonly service: AuthService, private route: Router) {}

  ngOnInit(): void {
    this.createForm();
    if (localStorage.authToken) {
      console.log('Token is present');
    } else {
      console.log('Token not found');
    }
  }

  userLogin() {
    const user: User = this.loginForm.value;
    console.log(user, '--User login');
    this.service.logIn(user.username, user.password).subscribe((data) => {
      console.log(data, '--data');
      if (localStorage.authToken) {
        console.log('Yes');
      } else {
        console.log('No');
      }
    });
    //   (data) => {
    //     alert('logged!');
    //     console.log(data, '--loggedIn');
    //     // this.route.navigate(['/book-list']).then(this.fulfilled, this.rejected);
    //   },
    //   (error) => console.log(error),
    //   () => console.log('Complete')
    // );
  }
}
