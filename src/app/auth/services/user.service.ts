import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, of } from 'rxjs';
import { User } from '../models/user';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly baseUrl = environment.apiUrl + 'users/';
  private readonly loginApi = 'api/auth';

  inMemoryToken;
  loggedIn = false;

  constructor(private http: HttpClient) {}

  get(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl);
  }

  logIn(email: string, password: string): Observable<any> {
    return this.http
      .post<any>(this.loginApi + '/login', { email, password })
      .pipe(
        tap((data) => {
          this.inMemoryToken = { token: data.accessToken, expiry: data.expiresIn };
          this.loggedIn = true;
        }),
        catchError((err) => {
          alert('UNAUTHORIZED!!');
          return of(err);
        })
      );
  }

  signUp(user: User): Observable<User> {
    return this.http.post<User>(this.baseUrl, user);
  }
}
