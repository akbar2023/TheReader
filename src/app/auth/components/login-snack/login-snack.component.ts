import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-snack',
  templateUrl: './login-snack.component.html',
  styleUrls: ['./login-snack.component.scss'],
})
export class LoginSnackComponent implements OnInit {
  userName: string;

  constructor(public authService: AuthService) {}

  ngOnInit(): void {
    this.userName = this.authService.userDetails.firstName;
  }
}
