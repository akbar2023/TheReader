import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  createForm() {
    this.loginForm = this.fb.group({
      email: [''],
      password: [''],
    });
  }

  constructor(private fb: FormBuilder, private readonly service: UserService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.createForm();
  }

  userLogin() {
    const user: User = this.loginForm.value;
    console.log(user, '--User login');
    this.service.logIn(user.email, user.password).subscribe(
      (data) => console.log(data),
      (error) => console.log(error),
      () => console.log('Complete')
    );
  }
}
