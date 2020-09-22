import { Component } from '@angular/core';
import { AuthService } from './auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'mediatheque';

  constructor(private authService: AuthService) {
    authService.isLoggedIn = !!this.authService.getToken();
    const userDetails = localStorage.getItem('userDetails');
    console.log('User from localstorage', JSON.parse(userDetails));
  }
}
