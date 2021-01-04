import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  hide = true;

  get firstName(): AbstractControl {
    return this.registerForm.get('firstName');
  }

  get lastName(): AbstractControl {
    return this.registerForm.get('lastName');
  }

  get email(): AbstractControl {
    return this.registerForm.get('email');
  }

  get password(): AbstractControl {
    return this.registerForm.get('password');
  }

  constructor(
    private fb: FormBuilder,
    public readonly service: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      email: [
        '',
        [Validators.required, Validators.email], // Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$')
      ],
      password: [
        '',
        [
          Validators.required,
          // REGEX: minimum 4 characters, at least one uppercase letter, one lowercase letter and one number
          Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{4,}$'),
          Validators.minLength(4),
          Validators.maxLength(20),
        ],
      ],
    });
  }

  register(): void {
    const user: User = this.registerForm.value;
    this.service.signUp(user).subscribe(
      (userResponse) => {
        if (userResponse === 200) {
          this.snackBar.open(`Congrats ${user.firstName}, your account is created! Login now!`, null, {
            duration: 3000,
            verticalPosition: 'top',
            panelClass: ['green-snackbar'],
          });
          setTimeout(() => {
            this.router.navigate(['home']).then();
          }, 3000);
        }
      },
      (error: any) => {
        // TODO: Manage errors
        // console.log(error.error.errors[1].defaultMessage, '--Message register');
        if (error.status === 400) {
          if (error.error === null) {
            this.email.setErrors({
              notUnique: true,
            });
          }
          this.snackBar.open(`Error occurred during registration.`, null, {
            duration: 3000,
            verticalPosition: 'top',
            panelClass: ['orange-snackbar'],
          });
        }
      },
      () => console.log('Completed')
    );
  }

  patternMessage(): string {
    return 'Password should contain numbers, uppercase and lowercase letters';
  }

  lengthMessage(length: number, minMax: number): string {
    return `The ${minMax === 0 ? 'minimum' : 'maximum'} length for this field is ${length} characters`;
  }

  requiredMessage(name: string): string {
    return `${name} is required`;
  }
}
