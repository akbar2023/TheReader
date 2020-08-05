import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
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

  constructor(private fb: FormBuilder, private readonly service: UserService, private route: Router) {}

  ngOnInit(): void {
    this.createForm();
  }

  userLogin() {
    const user: User = this.loginForm.value;
    console.log(user, '--User login');
    this.service.logIn(user.username, user.password).subscribe(
      (data) => {
        console.log(data);
        this.route.navigate(['/book-list']).then(this.fulfilled, this.rejected);
      },
      (error) => console.log(error),
      () => console.log('Complete')
    );
  }
}
