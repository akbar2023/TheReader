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
  private readonly baseUrl = 'http://localhost:8081/api/user';
  private readonly loginApi = 'api/auth';

  inMemoryToken;
  loggedIn = false;

  constructor(private http: HttpClient) {}

  get(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl);
  }

  logIn(username: string, password: string): Observable<any> {
    return this.http
      .post<any>('http://localhost:8081/login', { username, password })
      .pipe(
        tap((data) => {
          console.log(data, '--Data from login action');
          // this.inMemoryToken = { token: data.accessToken, expiry: data.expiresIn };
          // this.loggedIn = true;
        }),
        catchError((err) => {
          alert('UNAUTHORIZED!!');
          return of(err);
        })
      );
  }

  signUp(user: User): Observable<User> {
    return this.http.post<User>(this.baseUrl + '/register', user);
  }
}
