import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User } from '../models/user';
import { catchError, map } from 'rxjs/operators';
import { UserDetails } from '../models/userDetails';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly baseUrl = 'http://localhost:8081/api/user/';
  private readonly loginUrl = 'http://localhost:8081/login';

  public token: string;
  public isLoggedIn: boolean;
  public userDetails: UserDetails;

  constructor(private http: HttpClient) {
    console.log(this.userDetails, 'Auth service');
  }

  get(email: string): Observable<User> {
    return this.http.get<User>(this.baseUrl + email);
  }

  logIn(username: string, password: string) {
    return this.http
      .post<User>(
        this.loginUrl,
        { username, password },
        {
          headers: new HttpHeaders().set('Authorization', 'application/x-www-form-urlencoded'),
          observe: 'response',
          withCredentials: true,
        }
      )
      .pipe(
        map((response: HttpResponse<User>) => {
          this.token = response.headers.get('Authorization');
          localStorage.setItem('authToken', this.token);
          return 'Success';
        }),
        catchError((err) => {
          alert('Erreur !');
          return of(err);
        })
      );
  }

  signUp(user: User): Observable<User> {
    return this.http.post<User>(this.baseUrl + 'register/', user);
  }

  logOut() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userDetails');
    this.isLoggedIn = false;
    return 'logged out!';
  }

  getToken() {
    return (this.token = localStorage.getItem('authToken'));
  }
}
