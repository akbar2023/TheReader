import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private readonly service: AuthService) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.registerForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      password: [''],
    });
  }

  register() {
    const user: User = this.registerForm.value;
    this.service.signUp(user).subscribe(
      (userResponse) => {
        console.log(userResponse, '--userResponse');
      },
      (error) => {
        // TODO: Manage errors
        console.log(error);
      },
      () => console.log('Completed')
    );
  }
}
