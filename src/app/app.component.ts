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
    const isLoggedIn = !!this.authService.getToken();
    if (isLoggedIn) {
      authService.loggedIn = true;
    }
  }
}
