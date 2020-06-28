import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private readonly service: UserService) {
  }

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
    this.service.add(this.registerForm.value).subscribe(
      user => console.log(user),
      error => console.log(error),
      () => console.log('Completed'),
    );
  }

}
