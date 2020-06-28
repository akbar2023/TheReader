import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {UserService} from '../../services/user.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  createForm() {
    this.loginForm = this.fb.group({
      email: [''],
      password: [''],
    });
  }

  constructor(private fb: FormBuilder, private readonly service: UserService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.createForm();
  }

  userLogin() {
    const email = this.loginForm.value.email;
    this.service.getUser(email).subscribe(
      user => console.log('Success' + user),
      error => console.log(error),
      () => console.log('Completed')
      );
  }

}
